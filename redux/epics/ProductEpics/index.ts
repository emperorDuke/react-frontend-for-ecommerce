import { ActionsObservable } from "redux-observable";
import {
  ProductActionType,
  product,
  ProductType,
} from "../../actionCreators/ProductActions/@types";
import { EpicDepenciesType } from "../../../store";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import {
  productSuccess,
  productFailure,
} from "../../actionCreators/ProductActions";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { makeArray } from "../../../utils";

const ProductEpic = (
  action$: ActionsObservable<ProductActionType>,
  { http }: EpicDepenciesType
) =>
  action$.pipe(
    filter(isOfType(product.PRODUCT_REQUEST)),
    switchMap(({ payload }) =>
      ajax.getJSON<Array<ProductType> | ProductType>(payload).pipe(
        map(makeArray),
        map(productSuccess),
        catchError((err) => of(productFailure(err.response)))
      )
    )
  );

export default ProductEpic;
