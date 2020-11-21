import React from "react";
import Axios from "axios-observable";
import { AxiosRequestConfig } from "axios";
import { map, catchError } from "rxjs/operators";
import { of, Subject } from "rxjs";
import { useDidUpdateEffect } from "./useDidUpdate";
import useSelector from "../redux/utils/useStoreSelector";
import { BEARER } from "../redux/utils/constants";
import { useMemoCompare } from "./useMemoCompare";

export type Status = "idle" | "loading" | "success" | "failed";
type RequestConfig = Pick<
  AxiosRequestConfig,
  "method" | "url" | "data" | "headers"
>;

interface State {
  status: Status;
  data: any;
  error: any;
  requestConfig: RequestConfig;
}

type Action =
  | { type: "onSuccess"; payload: any }
  | { type: "onFailed"; payload: any }
  | { type: "initRequest"; payload: RequestConfig };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "onSuccess":
      return {
        ...state,
        data: action.payload,
        status: "success",
        error: null,
      };
    case "onFailed":
      return {
        ...state,
        status: "failed",
        error: action.payload,
        data: null,
      };
    case "initRequest":
      return {
        ...state,
        status: "loading",
        requestConfig: action.payload,
      };
    default:
      return state;
  }
}

function actionCreator(param: {}) {
  return param as Action;
}

const status$ = new Subject<Status>();

export const requestStatus$ = status$.asObservable();

export function useRequest({ auth = false }) {
  const authToken = useSelector(({ userAuth }) => userAuth.token);
  const [state, dispatch] = React.useReducer(reducer, {
    status: "idle",
    data: null,
    error: null,
    requestConfig: {},
  });

  useDidUpdateEffect(() => {
    const req$ = Axios.request(state.requestConfig)
      .pipe(
        map((response) => {
          if (response.status === 204) {
            status$.next("success");
            return actionCreator({
              type: "onSuccess",
              payload: "deleted",
            });
          }
          status$.next("success");
          return actionCreator({
            type: "onSuccess",
            payload: response.data,
          });
        }),
        catchError((err) => {
          status$.next("failed");
          return of(
            actionCreator({
              type: "onFailed",
              payload: err.response.data,
            })
          );
        })
      )
      .subscribe(dispatch);

    return () => req$.unsubscribe();
  }, [state.requestConfig]);

  const request = React.useCallback(
    (handler: RequestConfig) => {
      const defaultHeaders: { [key: string]: string } = {
        "Content-type": "application/json",
      };

      if (auth) {
        if (handler.headers) {
          handler.headers["Authorization"] = `${BEARER} ${authToken}`;
        }
        defaultHeaders["Authorization"] = `${BEARER} ${authToken}`;
      }

      const requestConfig = {
        url: handler.url,
        data: handler.data,
        method: handler.method || "POST",
        headers: handler.headers || defaultHeaders,
      };

      status$.next("loading");

      dispatch({
        type: "initRequest",
        payload: requestConfig,
      });
    },
    [authToken, BEARER]
  );

  const metas = React.useMemo(() => {
    const { requestConfig, ...object } = state;
    return object;
  }, [state]);

  return useMemoCompare({
    request,
    ...metas,
  });
}
