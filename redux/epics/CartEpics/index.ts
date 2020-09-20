import * as actions from "../../actionCreators/CartActions";
import * as T from "./@types";
import { StateObservable, ActionsObservable } from "redux-observable";
import {
  map,
  exhaustMap,
  catchError,
  withLatestFrom,
  ignoreElements,
  filter,
  debounceTime,
  takeWhile,
  flatMap,
} from "rxjs/operators";
import { of, iif, merge, EMPTY, forkJoin, Observable, concat } from "rxjs";
import { RootStoreState } from "../../reducers/RootReducer";
import { isOfType } from "typesafe-actions";
import { EpicDepenciesType } from "../../../store";
import { apiUrl as path } from "../../../services";
import { StoreType, storeSuccess } from "../../actionCreators/StoreActions";
import {
  AttributeType,
  attributeSuccess,
} from "../../actionCreators/AttributeActions";
import {
  ProductType,
  productSuccess,
} from "../../actionCreators/ProductActions";
import { BEARER, CART_STORAGE_KEY } from "../../utils/constants";
import { serialize } from "object-to-formdata";

const removeIndex = (
  cart: actions.CartType
): Omit<actions.CartType, "index"> => {
  if (cart["index"]) delete cart["index"];
  return cart;
};

const removeAttachments = (
  cart: actions.CartType
): Omit<actions.CartType, "attachment" | "index"> => {
  const variants = cart.variants.slice();

  variants.forEach((variant) => {
    delete variant["attachment"];
  });

  return {
    ...cart,
    variants,
  };
};

const storageStream = (cart: actions.CartType[]) =>
  of(cart).pipe(
    map((cart) => JSON.stringify(cart)),
    map((cart) => localStorage.setItem(CART_STORAGE_KEY, cart)),
    catchError((err) => of(console.error(err)))
  );

const addToCartEpic: T.CartEpic = (action$, state$, { http }) =>
  action$.pipe(
    filter(isOfType(actions.cart.ADD_ITEM)),
    map(({ payload }) => removeAttachments(payload)),
    withLatestFrom(state$),
    exhaustMap(([payload, state]) => {
      const form = serialize(payload, {
        indices: true,
        allowEmptyArrays: true,
      });

      return iif(
        () => state.userAuth.isLoggedIn,
        http
          .post(path("postCart"), form, {
            headers: {
              Authorization: `${BEARER} ${state.userAuth.token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .pipe(catchError((err) => of(console.error(err.response.data)))),
        storageStream(state.cart.cart)
      );
    }),
    ignoreElements()
  );

const fetchCartEpic: T.CartEpic = (action$, state$, { http }) =>
  action$.pipe(
    filter(isOfType(actions.cart.REQUEST)),
    withLatestFrom(state$),
    takeWhile(([, state]) => state.userAuth.isLoggedIn),
    exhaustMap(([, state]) =>
      http
        .get(path("getCarts"), {
          headers: {
            Authorization: `${BEARER} ${state.userAuth.token}`,
          },
        })
        .pipe(
          map(({ data: cart }) => actions.cartRequestSuccessful(cart)),
          catchError((err) => of(actions.cartRequestFailed(err.response.data)))
        )
    )
  );

const updateCartEpics: T.CartEpic = (action$, state$, { http }) =>
  action$.pipe(
    filter(isOfType(actions.cart.UPDATE_CART)),
    map(({ payload }) => removeIndex(payload)),
    map((payload) => removeAttachments(payload)),
    debounceTime(250),
    withLatestFrom(state$),
    exhaustMap(([payload, state]) =>
      iif(
        () => state.userAuth.isLoggedIn,
        http
          .patch(
            path("updateCart", payload.id),
            serialize(payload, {
              indices: true,
              allowEmptyArrays: true,
            }),
            {
              headers: {
                Authorization: `${BEARER} ${state.userAuth.token}`,
                "Content-type": "multipart/form-data",
              },
            }
          )
          .pipe(catchError((error) => of(console.error(error.response.data)))),
        storageStream(state.cart.cart)
      )
    ),
    ignoreElements()
  );

const removeFromCartEpic: T.CartEpic = (action$, state$, { http }) =>
  action$.pipe(
    filter(isOfType(actions.cart.REMOVE_ITEM)),
    withLatestFrom(state$),
    exhaustMap(([{ payload }, state]) =>
      iif(
        () => state.userAuth.isLoggedIn,
        http
          .delete(path("updateCart", payload.id), {
            headers: {
              Authorization: `${BEARER} ${state.userAuth.token}`,
            },
          })
          .pipe(catchError(() => EMPTY)),
        storageStream(state.cart.cart)
      )
    ),
    ignoreElements()
  );

export const dependencies = (
  cart: actions.CartType[],
  http: EpicDepenciesType["http"]
) => {
  const headers = {
    "Content-type": "application/json",
  };
  return merge(
    forkJoin(
      cart.map(
        ({ product }): Observable<ProductType> =>
          http
            .get(path("getProduct", product), {
              headers,
            })
            .pipe(
              map(({ data }) => data),
              catchError(() => EMPTY)
            )
      )
    ).pipe(
      exhaustMap((products) =>
        concat(
          of(productSuccess(products)),
          of(products).pipe(
            takeWhile((products) => !!products.length),
            exhaustMap((products) =>
              forkJoin(
                products.map(
                  ({ store }): Observable<StoreType> =>
                    http
                      .get(path("getMerchantStore", store), {
                        headers,
                      })
                      .pipe(
                        map(({ data }) => data),
                        catchError(() => EMPTY)
                      )
                )
              ).pipe(exhaustMap((stores) => of(storeSuccess(stores))))
            )
          )
        )
      )
    ),
    forkJoin(
      cart.map(
        ({ product }): Observable<AttributeType[]> =>
          http
            .get(path("getProductAttributes", product), {
              headers,
            })
            .pipe(
              map(({ data }) => data),
              catchError(() => EMPTY)
            )
      )
    ).pipe(
      flatMap((attributes) => attributes),
      exhaustMap((attributes) => of(attributeSuccess(attributes)))
    )
  );
};

const getCartDepencies: T.CartDepenciesEpic = (action$, state$, { http }) =>
  action$.pipe(
    filter(isOfType(actions.cart.LOAD_CART)),
    exhaustMap(({ payload: cart }) => dependencies(cart, http))
  );

const cartEpics = (
  action$: ActionsObservable<actions.CartActionTypes>,
  state$: StateObservable<RootStoreState>,
  depencies: EpicDepenciesType
) =>
  merge(
    addToCartEpic(action$, state$, depencies),
    fetchCartEpic(action$, state$, depencies),
    updateCartEpics(action$, state$, depencies),
    removeFromCartEpic(action$, state$, depencies),
    getCartDepencies(action$, state$, depencies)
  );

export default cartEpics;
