import { ActionsObservable } from "redux-observable";
import {
  LocationActionTypes,
  location,
  locationSuccess,
  LocationTypes,
  locationFailure
} from "../../actionCreators/LocationActions";
import { EpicDepenciesType } from "../../../store";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";

export default (
  action$: ActionsObservable<LocationActionTypes>,
  { http }: EpicDepenciesType
) =>
  action$.pipe(
    filter(isOfType(location.REQUEST)),
    switchMap(({ payload }) =>
      ajax.getJSON<string[]>(payload).pipe(
        map(res => locationSuccess(res)),
        catchError(err => of(locationFailure(err.response)))
      )
    )
  );
