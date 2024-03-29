import { ActionsObservable } from "redux-observable";
import * as T from "../../actionCreators/AttributeActions";
import { EpicDepenciesType } from "../../../store";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { of } from "rxjs";
import { makeArray } from "../../../utils";

const AttributeEpic = (
  action$: ActionsObservable<T.AttributeActionType>,
  { http }: EpicDepenciesType
) =>
  action$.pipe(
    filter(isOfType(T.attribute.ATTRIBUTE_REQUEST)),
    switchMap(({ payload }) =>
      http
        .get(payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .pipe(
          map(({ data: attribute }) => T.attributeSuccess(makeArray(attribute))),
          catchError((err) => of(T.attributeFailure(err.response)))
        )
    )
  );

export default AttributeEpic;
