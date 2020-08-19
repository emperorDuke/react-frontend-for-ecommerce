import cookie from "js-cookie";
import { IncomingMessage } from "http";

export function getCookie(key: string, req?: IncomingMessage) {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
}

export function setCookie(key: string, value: string | object) {
  if (process.browser) cookie.set(key, value, { expires: 1 });
}

export function removeCookie(key: string) {
  if (process.browser) cookie.remove(key, { expires: 1 });
}

function getCookieFromBrowser(key: string) {
  return cookie.get(key);
}

function getCookieFromServer(key: string, req?: IncomingMessage) {
  if (req) {
    if (!req.headers.cookie) {
      return undefined;
    }

    const rawString = req.headers.cookie
      .split(";")
      .find((c) => c.trim().startsWith(`${key}=`));

    if (!rawString) {
      return undefined;
    }

    return rawString.split("=")[1];
  }
}
