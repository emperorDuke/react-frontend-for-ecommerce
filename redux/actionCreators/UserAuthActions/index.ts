import { auth } from "./@types";
import { setCookie, removeCookie } from "../../../cookie";
import { ThunkAction } from "redux-thunk";
import { RootStoreState } from "../../reducers/RootReducer";
import { AnyAction } from "redux";
import post, { REQ } from "../../../utils/Post";

export function authenticate(
  token: string,
  type: typeof auth.AUTHENTICATE = auth.AUTHENTICATE
) {
  setCookie("token", token);
  return {
    type: type,
    payload: token,
  };
}

export function deAuthenticate(
  type: typeof auth.DEAUTHENTICATE = auth.DEAUTHENTICATE
) {
  removeCookie("token");
  return {
    type: type,
  };
}

export function restoreState(
  token: string,
  type: typeof auth.RESTORE_AUTH_STATE = auth.RESTORE_AUTH_STATE
) {
  return {
    type: type,
    payload: token,
  };
}

export function signUp(
  url: string,
  method: REQ,
  data: {}
): ThunkAction<AnyAction, RootStoreState, void, AnyAction> {
  return (dispatch, getState) => {
    dispatch(post(url, method, data));
    const token = getState().posts.sucessMessage
      ? (getState().posts.sucessMessage as any)["token"]
      : "";
    return dispatch(authenticate(token));
  };
}

export * from "./@types";
