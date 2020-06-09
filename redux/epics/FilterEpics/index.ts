import { ActionsObservable } from "redux-observable";
import {
  FilterActionTypes,
  filter as filterType,
  FilterKeyTypes
} from "../../actionCreators/FilterActions";
import { EpicDepenciesType } from "../../../store";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import {
  filterSuccess,
  filterFailure
} from "../../actionCreators/FilterActions";
import { of } from "rxjs";

const filterEpic = (
  action$: ActionsObservable<FilterActionTypes>,
  { http }: EpicDepenciesType
) =>
  action$.pipe(
    filter(isOfType(filterType.FILTER_REQUEST)),
    switchMap(({ payload }) =>
      http.getJSON<FilterKeyTypes>(payload).pipe(
        map(filters => filterSuccess(filters)),
        catchError(err => of(filterFailure(err.response)))
      )
    )
  );

export default filterEpic;
