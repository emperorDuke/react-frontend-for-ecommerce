export enum auth {
  AUTHENTICATE = "AUTHENTICATE",
  DEAUTHENTICATE = "DEAUTHENTICATE",
  RESTORE_AUTH_STATE = "RESTORE_AUTH_STATE",
}

export interface Authenticate {
  type: auth.AUTHENTICATE;
  payload: string;
}

export interface Deauthenticate {
  type: auth.DEAUTHENTICATE;
}

export interface RestoreAuth {
  type: auth.RESTORE_AUTH_STATE;
  payload: string;
}

export type AuthActionType = Authenticate | Deauthenticate | RestoreAuth;
