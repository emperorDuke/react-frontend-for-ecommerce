import { Epic } from "redux-observable";
import { PostActionTypes, post } from "../../actionCreators/PostActions/@types";
import { RootStoreState } from "../../reducers/RootReducer";
import { EpicDepenciesType } from "../../../store";
import {
  filter,
  mergeMap,
  switchMap,
  catchError,
  withLatestFrom,
  concatAll,
  map,
} from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import {
  postingSuccess,
  postingFailed,
} from "../../actionCreators/PostActions";
import { of, iif, from } from "rxjs";
import {
  Authenticate,
  authenticate,
} from "../../actionCreators/UserAuthActions";
import { BEARER } from "../../utils/constants";

type PostEpic = Epic<
  PostActionTypes | Authenticate,
  PostActionTypes | Authenticate,
  RootStoreState,
  EpicDepenciesType
>;

type Header = {
  [key: string]: string;
};

const property = Object.prototype.hasOwnProperty;

const postEpic: PostEpic = (action$, state$, { http }) =>
  action$.pipe(
    filter(isOfType(post.POST_ITEM)),
    withLatestFrom(state$),
    switchMap(([{ payload }, state]) => {
      let headers: Header = {};

      if (payload.reqAuth && state.userAuth.token) {
        headers["Authorization"] = `${BEARER} ${state.userAuth.token}`;
      } else if (payload.config) {
        for (let configKey in payload.config) {
          Object.defineProperty(headers, configKey, {
            value: payload.config[configKey],
            enumerable: true,
          });
        }
      } else {
        headers["Content-Type"] = "application/json";
      }

      return http.post(payload.url, payload.body, { headers }).pipe(
        mergeMap(({ data: response }) =>
          iif(
            () =>
              property.call(response, "token") &&
              response["token"] !== null &&
              response["token"] !== undefined,
            from([
              of(authenticate(response["token"])),
              of(response).pipe(
                map(({ token, ...rest }) => rest),
                map(postingSuccess)
              ),
            ]).pipe(concatAll()),
            of(postingSuccess(response))
          )
        ),
        catchError((err) => of(postingFailed(err.response.data)))
      );
    })
  );

export default postEpic;
