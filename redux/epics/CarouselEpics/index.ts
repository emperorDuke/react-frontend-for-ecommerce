import { ActionsObservable } from "redux-observable";
import {
  CarouselActionTypes,
  carousel,
  CarouselType
} from "../../actionCreators/CarouselActions/@types";
import { EpicDepenciesType } from "../../../store";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import {
  carouselSuccess,
  carouselFailure
} from "../../actionCreators/CarouselActions";
import { of } from "rxjs";

export default (
  action$: ActionsObservable<CarouselActionTypes>,
  { http }: EpicDepenciesType
) =>
  action$.pipe(
    filter(isOfType(carousel.CAROUSEL_REQUEST)),
    switchMap(({ payload }) =>
      http.getJSON<CarouselType[]>(payload).pipe(
        map(res => carouselSuccess(res)),
        catchError(err => of(carouselFailure(err.response)))
      )
    )
  );
