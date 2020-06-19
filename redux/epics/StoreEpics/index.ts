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

const storesEpic = (
  action$: ActionsObservable<StoreActionTypes>,
  { http }: EpicDepenciesType
) =>
  action$.pipe(
    filter(isOfType(store.STORE_REQUEST)),
    switchMap(({ payload }) =>
      http.getJSON<Array<StoreType> | StoreType>(payload).pipe(
        map((stores) =>
          Array.isArray(stores) ? storeSuccess(stores) : storeSuccess([stores])
        ),
        catchError((err) => of(storeFailure(err.response)))
      )
    )
  );

export default storesEpic;
