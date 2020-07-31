import { ActionsObservable } from "redux-observable";
import * as T from "../../actionCreators/ProductMetaActions";
import { EpicDepenciesType } from "../../../store";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { of } from "rxjs";
import { makeArray } from "../../../utils";

const MetaEpic = (
  action$: ActionsObservable<T.MetaActionType>,
  { http }: EpicDepenciesType
) =>
  action$.pipe(
    filter(isOfType(T.meta.META_REQUEST)),
    switchMap(({ payload }) =>
      http.getJSON<T.MetaType>(payload).pipe(
        map(makeArray),
        map(T.metaSucessful),
        catchError(err => of(T.metafailure(err.response)))
      )
    )
  );

export default MetaEpic;
