import { auth, Authenticate, Deauthenticate, RestoreAuth } from "./@types";
import { setCookie, removeCookie } from "../../../cookie";
import { TOKEN } from "../../../utils/cookieConstants";

export function authenticate(token: string): Authenticate {
  setCookie(TOKEN, token);
  return {
    type: auth.AUTHENTICATE,
    payload: token,
  };
}

export function deAuthenticate(): Deauthenticate {
  removeCookie(TOKEN);
  return {
    type: auth.DEAUTHENTICATE,
  };
}

export function restoreState(token: string): RestoreAuth {
  return {
    type: auth.RESTORE_AUTH_STATE,
    payload: token,
  };
}

export * from "./@types";
