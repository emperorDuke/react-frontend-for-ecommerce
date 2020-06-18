import * as actions from "../../actionCreators/CartActions";
import { Epic, StateObservable, ActionsObservable } from "redux-observable";
import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  ignoreElements,
  filter,
  debounceTime,
  takeWhile,
  mergeAll,
} from "rxjs/operators";
import { of, from, iif, merge, EMPTY, forkJoin, Observable } from "rxjs";
import { RootStoreState } from "../../reducers/RootReducer";
import { isOfType } from "typesafe-actions";
import { EpicDepenciesType } from "../../../store";
import { CartActionTypes, CartType } from "../../actionCreators/CartActions";
import { apiUrl } from "../../../services";
import { CART_STORAGE_KEY } from "../../../components/CartSection/utils";
import {
  StoreActionTypes,
  StoreType,
  storeSuccess,
} from "../../actionCreators/StoreActions";
import {
  AttributeActionType,
  AttributeType,
  attributeSuccess,
} from "../../actionCreators/AttributeActions";
import {
  ProductActionType,
  ProductType,
  productSuccess,
} from "../../actionCreators/ProductActions";

type CartEpic = Epic<
  actions.CartActionTypes,
  actions.CartActionTypes,
  RootStoreState,
  EpicDepenciesType
>;

type InputType =
  | actions.CartActionTypes
  | StoreActionTypes
  | AttributeActionType
  | ProductActionType;

type OutputType = InputType;

type CartDepenciesEpic = Epic<
  InputType,
  OutputType,
  RootStoreState,
  EpicDepenciesType
>;


const removeIndex = (cart: actions.CartType) => {
  delete cart["index"];
  return cart;
};

const storageStream = (state$: StateObservable<RootStoreState>) =>
  EMPTY.pipe(
    withLatestFrom(state$),
    map(([, state]) => JSON.stringify(state.cart.cart)),
    map((cart) => localStorage.setItem(CART_STORAGE_KEY, cart)),
    catchError((err) => of(console.log(err)))
  );

const addToCartEpic: CartEpic = (action$, state$, { http }) =>
  action$.pipe(
    filter(isOfType(actions.cart.ADD_ITEM)),
    map(({ payload }) => removeIndex(payload)),
    withLatestFrom(state$),
    switchMap(([payload, state]) =>
      iif(
        () => state.userAuth.isLoggedIn,
        http
          .post(urlType("updateCart", payload.id), JSON.stringify(payload), {
            Authorization: `JWT ${state.userAuth.token}`,
            "Content-type": "application/json",
          })
          .pipe(catchError(() => EMPTY)),
        storageStream(state$)
      )
    ),
    ignoreElements()
  );

const fetchCartEpic: CartEpic = (action$, state$, { http }) =>
  action$.pipe(
    filter(isOfType(actions.cart.REQUEST)),
    withLatestFrom(state$),
    takeWhile(([, state]) => state.userAuth.isLoggedIn),
    switchMap(([, state]) =>
      http
        .getJSON<Array<CartType>>(urlType("getCarts"), {
          Authorization: `JWT ${state.userAuth.token}`,
        })
        .pipe(
          map((cart) => actions.cartRequestSuccessful(cart)),
          catchError((err) => of(actions.cartRequestFailed(err.response)))
        )
    )
  );

const updateCartEpics: CartEpic = (action$, state$, { http }) =>
  action$.pipe(
    filter(isOfType(actions.cart.UPDATE_CART)),
    map(({ payload }) => removeIndex(payload)),
    debounceTime(2000),
    withLatestFrom(state$),
    switchMap(([payload, state]) =>
      iif(
        () => state.userAuth.isLoggedIn,
        http
          .post(urlType("updateCart", payload.id), JSON.stringify(payload), {
            Authorization: `JWT ${state.userAuth.token}`,
            "Content-type": "application/json",
          })
          .pipe(catchError(() => EMPTY)),
        storageStream(state$)
      )
    ),
    ignoreElements()
  );

const removeFromCartEpic: CartEpic = (action$, state$, { http }) =>
  action$.pipe(
    filter(isOfType(actions.cart.REMOVE_ITEM)),
    withLatestFrom(state$),
    switchMap(([{ payload }, state]) =>
      iif(
        () => state.userAuth.isLoggedIn,
        http
          .delete(urlType("updateCart", payload.id), {
            Authorization: `JWT ${state.userAuth.token}`,
          })
          .pipe(catchError(() => EMPTY)),
        storageStream(state$)
      )
    ),
    ignoreElements()
  );

const getCartDepencies: CartDepenciesEpic = (action$, state$, { http }) =>
  action$.pipe(
    filter(isOfType(actions.cart.LOAD_CART)),
    withLatestFrom(state$),
    switchMap(([, { cart: { cart } }]) =>
      from([
        forkJoin(
          cart.map(
            ({ product }): Observable<ProductType> =>
              http
                .getJSON<ProductType>(urlType("getProduct", product))
                .pipe(catchError(() => EMPTY))
          )
        ).pipe(switchMap((products) => of(productSuccess(products)))),
        forkJoin(
          cart.map(
            ({ product }): Observable<Array<AttributeType>> =>
              http
                .getJSON<Array<AttributeType>>(
                  urlType("getProductAttributes", product)
                )
                .pipe(catchError(() => EMPTY))
          )
        ).pipe(
          map((attributes) => attributes.reduce((a, b) => a.concat(b))),
          switchMap((attributes) => of(attributeSuccess(attributes)))
        ),
        EMPTY.pipe(
          withLatestFrom(state$),
          takeWhile(([, { products }]) => products.products.length > 0),
          map(([, state]) => state.products.products),
          switchMap((products) =>
            forkJoin(
              products.map(
                ({ store }): Observable<StoreType> =>
                  http
                    .getJSON<StoreType>(urlType("getMerchantStore", store))
                    .pipe(catchError(() => EMPTY))
              )
            ).pipe(switchMap((stores) => of(storeSuccess(stores))))
          )
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
