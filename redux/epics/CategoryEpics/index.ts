import { ActionsObservable, StateObservable } from "redux-observable";
import {
  CategoryActionTypes,
  category,
  CategoryTypes,
} from "../../actionCreators/CategoryActions/@types";
import { EpicDepenciesType } from "../../../store";
import { filter, switchMap, map, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import {
  categorySuccess,
  categoryFailure,
} from "../../actionCreators/CategoryActions";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { RootStoreState } from "../../reducers/RootReducer";

const categoryEpics =  (
  action$: ActionsObservable<CategoryActionTypes>,
  state$: StateObservable<RootStoreState>,
  { http }: EpicDepenciesType
) =>
  action$.pipe(
    filter(isOfType(category.REQUEST)),
    switchMap(({ payload }) =>
      http
        .get<CategoryTypes[]>(payload, {
          headers: { "Content-Type": "application/json" },
        })
        .pipe(
          map(({ data: res }) => categorySuccess(res)),
          catchError((err) => of(categoryFailure(err.response)))
        )
    )
  );

export default categoryEpics;
