import * as actions from "../../actionCreators/CartActions";
import * as T from "./@types";
import { StateObservable, ActionsObservable } from "redux-observable";
import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  ignoreElements,
  filter,
  debounceTime,
  takeWhile,
  flatMap,
  concatAll,
  mergeAll,
} from "rxjs/operators";
import { of, from, iif, merge, EMPTY, forkJoin, Observable } from "rxjs";
import { RootStoreState } from "../../reducers/RootReducer";
import { isOfType } from "typesafe-actions";
import { EpicDepenciesType } from "../../../store";
import { CartActionTypes, CartType } from "../../actionCreators/CartActions";
import { apiUrl as path } from "../../../services";
import { CART_STORAGE_KEY } from "../../../components/CartSection/utils";
import { StoreType, storeSuccess } from "../../actionCreators/StoreActions";
import {
  AttributeType,
  attributeSuccess,
} from "../../actionCreators/AttributeActions";
import {
  ProductType,
  productSuccess,
} from "../../actionCreators/ProductActions";
import { BEARER } from "../../utils/bearer-constant";
import { ajax, AjaxError } from "rxjs/ajax";

const removeIndex = (cart: actions.CartType) => {
  if (cart["index"]) delete cart["index"];
  return cart;
};

const storageStream = (cart: actions.CartType[]) =>
  of(cart).pipe(
    map((cart) => JSON.stringify(cart)),
    map((cart) => localStorage.setItem(CART_STORAGE_KEY, cart)),
    catchError((err) => of(console.error(err)))
  );

const addToCartEpic: T.CartEpic = (action$, state$) =>
  action$.pipe(
    filter(isOfType(actions.cart.ADD_ITEM)),
    map(({ payload }) => payload),
    withLatestFrom(state$),
    switchMap(([payload, state]) =>
      iif(
        () => state.userAuth.isLoggedIn,
        ajax
          .post(path("updateCart", payload.id), JSON.stringify(payload), {
            Authorization: `${BEARER} ${state.userAuth.token}`,
            "Content-type": "application/json",
          })
          .pipe(catchError(() => EMPTY)),
        storageStream(state.cart.cart)
      )
    ),
    ignoreElements()
  );

const fetchCartEpic: T.CartEpic = (action$, state$) =>
  action$.pipe(
    filter(isOfType(actions.cart.REQUEST)),
    withLatestFrom(state$),
    takeWhile(([, state]) => state.userAuth.isLoggedIn),
    switchMap(([, state]) =>
      ajax
        .getJSON<Array<CartType>>(path("getCarts"), {
          Authorization: `${BEARER} ${state.userAuth.token}`,
        })
        .pipe(
          map((cart) => actions.cartRequestSuccessful(cart)),
          catchError((err: AjaxError) =>
            of(actions.cartRequestFailed(err.response))
          )
        )
    )
  );

const updateCartEpics: T.CartEpic = (action$, state$) =>
  action$.pipe(
    filter(isOfType(actions.cart.UPDATE_CART)),
    map(({ payload }) => removeIndex(payload)),
    debounceTime(100),
    withLatestFrom(state$),
    switchMap(([payload, state]) =>
      iif(
        () => state.userAuth.isLoggedIn,
        ajax
          .post(path("updateCart", payload.id), JSON.stringify(payload), {
            Authorization: `${BEARER} ${state.userAuth.token}`,
            "Content-type": "application/json",
          })
          .pipe(catchError(() => EMPTY)),
        storageStream(state.cart.cart)
      )
    ),
    ignoreElements()
  );

const removeFromCartEpic: T.CartEpic = (action$, state$) =>
  action$.pipe(
    filter(isOfType(actions.cart.REMOVE_ITEM)),
    withLatestFrom(state$),
    switchMap(([{ payload }, state]) =>
      iif(
        () => state.userAuth.isLoggedIn,
        ajax
          .delete(path("updateCart", payload.id), {
            Authorization: `${BEARER} ${state.userAuth.token}`,
          })
          .pipe(catchError(() => EMPTY)),
        storageStream(state.cart.cart)
      )
    ),
    ignoreElements()
  );

const getCartDepencies: T.CartDepenciesEpic = (action$) =>
  action$.pipe(
    filter(isOfType(actions.cart.LOAD_CART)),
    switchMap(({ payload: cart }) =>
      from([
        forkJoin(
          cart.map(
            ({ product }): Observable<ProductType> =>
              ajax
                .getJSON<ProductType>(path("getProduct", product))
                .pipe(catchError(() => EMPTY))
          )
        ).pipe(
          switchMap((products) =>
            from([
              of(productSuccess(products)),
              of(products).pipe(
                takeWhile((products) => !!products.length),
                switchMap((products) =>
                  forkJoin(
                    products.map(
                      ({ store }): Observable<StoreType> =>
                        ajax
                          .getJSON<StoreType>(path("getMerchantStore", store))
                          .pipe(catchError(() => EMPTY))
                    )
                  ).pipe(switchMap((stores) => of(storeSuccess(stores))))
                )
              ),
            ]).pipe(concatAll())
          )
        ),
        forkJoin(
          cart.map(
            ({ product }): Observable<AttributeType[]> =>
              ajax
                .getJSON<AttributeType[]>(path("getProductAttributes", product))
                .pipe(catchError(() => EMPTY))
          )
        ).pipe(
          flatMap((attributes) => attributes),
          switchMap((attributes) => of(attributeSuccess(attributes)))
        ),
      ]).pipe(mergeAll())
    )
  );

export default (
  action$: ActionsObservable<CartActionTypes>,
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
