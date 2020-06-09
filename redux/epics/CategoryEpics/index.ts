import { ActionsObservable } from "redux-observable";
import {
  CategoryActionTypes,
  category,
  CategoryTypes
} from "../../actionCreators/CategoryActions/@types";
import { EpicDepenciesType } from "../../../store";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import {
  categorySuccess,
  categoryFailure
} from "../../actionCreators/CategoryActions";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";

export default (
  action$: ActionsObservable<CategoryActionTypes>,
  { http }: EpicDepenciesType
) =>
  action$.pipe(
    filter(isOfType(category.REQUEST)),
    switchMap(({ payload }) =>
      ajax.getJSON<CategoryTypes[]>(payload).pipe(
        map(res => categorySuccess(res)),
        catchError(err => of(categoryFailure(err.response)))
      )
    )
  );
