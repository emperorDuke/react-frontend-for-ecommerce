import * as T from "./@types";

export function metaRequest(payload: string): T.MeteRequest {
  return {
    type: T.meta.META_REQUEST,
    payload
  };
}

export function metaSucessful(payload: T.MetaType[]): T.MetaSucess {
  return {
    type: T.meta.META_SUCESSFUL,
    payload
  };
}

export function metafailure(payload: string): T.MetaFailure {
  return {
    type: T.meta.META_ERROR,
    payload
  };
}

export * from "./@types";
