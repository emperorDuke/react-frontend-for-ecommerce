import { ActionsObservable } from "redux-observable";
import {
  StoreActionTypes,
  store,
  storeSuccess,
  storeFailure,
  StoreType,
} from "../../actionCreators/StoreActions";
import { EpicDepenciesType } from "../../../store";
import { filter, map, catchError, switchMap } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { makeArray } from "../../../utils";

const storesEpic = (
  action$: ActionsObservable<StoreActionTypes>,
  { http }: EpicDepenciesType
) =>
  action$.pipe(
    filter(isOfType(store.STORE_REQUEST)),
    switchMap(({ payload }) =>
      ajax.getJSON<StoreType[] | StoreType>(payload).pipe(
        map(makeArray),
        map(storeSuccess),
        catchError((err) => of(storeFailure(err.response)))
      )
    )
  );
export default storesEpic;
