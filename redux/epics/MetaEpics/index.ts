import { ActionsObservable, StateObservable } from "redux-observable";
import * as T from "../../actionCreators/ProductMetaActions";
import { EpicDepenciesType } from "../../../store";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { of } from "rxjs";
import { makeArray } from "../../../utils";
import { RootStoreState } from "../../reducers/RootReducer";

const MetaEpic = (
  action$: ActionsObservable<T.MetaActionType>,
  state$: StateObservable<RootStoreState>,
  { http }: EpicDepenciesType
) =>
  action$.pipe(
    filter(isOfType(T.meta.META_REQUEST)),
    switchMap(({ payload }) =>
      http
        .get(payload, { headers: { "Content-Type": "application/json" } })
        .pipe(
          map(({ data }) => makeArray(data)),
          map(T.metaSucessful),
          catchError((err) => of(T.metafailure(err.response.data)))
        )
    )
  );

export default MetaEpic;
