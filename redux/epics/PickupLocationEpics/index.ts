import { ActionsObservable } from "redux-observable";
import {
  PickupLocationActionTypes,
  PickupLocation,
  PickupLocations,
  pickUpLocationSuccessful,
  pickUpLocationFailed
} from "../../actionCreators/PickupLocations";
import { EpicDepenciesType } from "../../../store";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";

export default function PickupLocationEpic(
  action$: ActionsObservable<PickupLocationActionTypes>,
  { http }: EpicDepenciesType
) {
  return action$.pipe(
    filter(isOfType(PickupLocation.REQUEST)),
    switchMap(action =>
      ajax.getJSON<Array<PickupLocations>>(action.payload).pipe(
        map(res => pickUpLocationSuccessful(res)),
        catchError(err => of(pickUpLocationFailed(err.response)))
      )
    )
  );
}
