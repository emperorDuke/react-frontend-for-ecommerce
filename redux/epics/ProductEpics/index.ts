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

const ProductEpic = (
  action$: ActionsObservable<ProductActionType>,
  { http }: EpicDepenciesType
) =>
  action$.pipe(
    filter(isOfType(product.PRODUCT_REQUEST)),
    switchMap(({ payload }) =>
      http.getJSON<Array<ProductType> | ProductType>(payload).pipe(
        map((product) =>
          Array.isArray(product)
            ? productSuccess(product)
            : productSuccess([product])
        ),
        catchError((err) => of(productFailure(err.response)))
      )
    )
  );

export default ProductEpic;
