import { Action } from "redux";
import { setCookie } from "../../../cookie";
import { USERID } from "../../../utils/cookieConstants";

export interface UserType {
  id?: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  phone_number: string;
  user_type?: string;
}

export enum user {
  REQUEST = "request",
  FETCH_SUCCESSFUL = "fetch successful",
  FETCH_FAILED = "fetch failed",
}

export interface UserRequestType extends Action {
  type: user.REQUEST;
  payload: string;
}

export interface UserSuccessfulType extends Action {
  type: user.FETCH_SUCCESSFUL;
  payload: UserType;
}

export interface UserFailedType extends Action {
  type: user.FETCH_FAILED;
  payload: string;
}

export function userRequest(payload: string): UserRequestType {
  return {
    type: user.REQUEST,
    payload,
  };
}

export function userSuccesful(payload: UserType): UserSuccessfulType {
  setCookie(USERID, String(payload.id));
  return {
    type: user.FETCH_SUCCESSFUL,
    payload,
  };
}

export function userFailed(payload: string): UserFailedType {
  return {
    type: user.FETCH_FAILED,
    payload,
  };
}

export type UserActionType =
  | UserRequestType
  | UserSuccessfulType
  | UserFailedType;
