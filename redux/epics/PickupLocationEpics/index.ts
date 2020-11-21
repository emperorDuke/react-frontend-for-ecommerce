import { ActionsObservable } from "redux-observable";
import {
  PickupLocationAction,
  PickupLocation,
  pickUpLocationSuccessful,
  pickUpLocationFailed,
} from "../../actionCreators/PickupLocations";
import { EpicDepenciesType } from "../../../store";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { of } from "rxjs";

export default function PickupLocationEpic(
  action$: ActionsObservable<PickupLocationAction>,
  { http }: EpicDepenciesType
) {
  return action$.pipe(
    filter(isOfType(PickupLocation.REQUEST)),
    switchMap((action) =>
      http
        .get(action.payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .pipe(
          map(({ data }) => pickUpLocationSuccessful(data)),
          catchError((err) => of(pickUpLocationFailed(err.response)))
        )
    )
  );
}
