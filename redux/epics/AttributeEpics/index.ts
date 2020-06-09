import { ActionsObservable } from "redux-observable";
import * as T from "../../actionCreators/AttributeActions";
import { EpicDepenciesType } from "../../../store";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { of } from "rxjs";


const AttributeEpic = (action$: ActionsObservable<T.AttributeActionType>, { http }: EpicDepenciesType) => (
    action$.pipe(
        filter(isOfType(T.attribute.ATTRIBUTE_REQUEST)),
        switchMap(({ payload }) => 
            http.getJSON<Array<T.AttributeType> | T.AttributeType>(
                payload
            )
            .pipe(
               map(attribute => 
                    Array.isArray(attribute) ?
                    T.attributeSuccess(attribute) :
                    T.attributeSuccess([attribute])
                ),
                catchError(err => of(T.attributeFailure(err.response)))
            )
        )
    )
);

export default AttributeEpic;