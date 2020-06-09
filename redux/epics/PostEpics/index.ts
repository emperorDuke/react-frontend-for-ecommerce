import { Epic } from "redux-observable";
import { PostActionTypes, post } from "../../actionCreators/PostActions/@types";
import { RootStoreState } from "../../reducers/RootReducer";
import { EpicDepenciesType } from "../../../store";
import {
  filter,
  mergeMap,
  switchMap,
  catchError,
  withLatestFrom
} from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import {
  postingSuccess,
  postingFailed
} from "../../actionCreators/PostActions";
import { of, iif, concat } from "rxjs";
import { authenticate } from "../../actionCreators/UserAuthActions";

type PostEpic = Epic<
  PostActionTypes | ReturnType<typeof authenticate>,
  PostActionTypes | ReturnType<typeof authenticate>,
  RootStoreState,
  EpicDepenciesType
>;

type Header = {
  [key: string]: string;
};

const postEpic: PostEpic = (action$, state$, { http }) =>
  action$.pipe(
    filter(isOfType(post.POST_ITEM)),
    withLatestFrom(state$),
    switchMap(([{ payload }, state]) => {
      let headers: Header = Object.create(Object.prototype);

      if (payload.reqAuth && state.userAuth.token) {
        headers["Authorization"] = `JWT ${state.userAuth.token}`;
      } else if (payload.config) {
        for (let configKey in payload.config) {
          Object.defineProperty(headers, configKey, {
            value: payload.config[configKey],
            enumerable: true
          });
        }
      } else {
        headers["Content-Type"] = "application/json";
      }

      return http.post(payload.url, payload.body, headers).pipe(
        mergeMap(res =>
          iif(
            () =>
              Object.prototype.hasOwnProperty.call(res.response, "token") &&
              res.response["token"] !== null &&
              res.response["token"] !== undefined,
            concat(
              of(authenticate(res.response["token"])),
              of(postingSuccess(res.response))
            ),
            of(postingSuccess(res.response))
          )
        ),
        catchError(err => of(postingFailed(err.response)))
      );
    })
  );

export default postEpic;
