import { ActionsObservable, StateObservable } from "redux-observable";
import { EpicDepenciesType } from "../../../store";
import {
  filter,
  map,
  catchError,
  exhaustMap,
  withLatestFrom,
} from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { of } from "rxjs";
import {
  user,
  userSuccesful,
  UserActionType,
  userFailed,
} from "../../actionCreators/UserActions";
import { RootStoreState } from "../../reducers/RootReducer";
import { BEARER } from "../../utils/constants";

type Header = {
  [key: string]: string;
};

const userEpic = (
  action$: ActionsObservable<UserActionType>,
  state$: StateObservable<RootStoreState>,
  { http }: EpicDepenciesType
) =>
  action$.pipe(
    filter(isOfType(user.REQUEST)),
    withLatestFrom(state$),
    exhaustMap(([{ payload }, state]) => {
      let headers: Header = {};

      headers["Content-Type"] = "application/json";

      if (state.userAuth.token) {
        headers["Authorization"] = `${BEARER} ${state.userAuth.token}`;
      }
      return http.get(payload, { headers }).pipe(
        map(({ data }) => userSuccesful(data)),
        catchError((err) => of(userFailed(err.response.data)))
      );
    })
  );
export default userEpic;
