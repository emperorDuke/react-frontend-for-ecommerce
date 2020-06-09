import { post, PostingPayloadType, PostingType, PostingSuccessType, PostingFailedType } from "./@types";

export * from "./@types";

export function Posting(payload: PostingPayloadType):PostingType {
  return {
    type: post.POST_ITEM,
    payload
  };
}

export function postingSuccess(payload: string | {}):PostingSuccessType {
  return {
    type: post.POST_SUCCESSFUL,
    payload
  };
}

export function postingFailed(payload: string | {}):PostingFailedType {
  return {
    type: post.POSTING_FAILED,
    payload
  };
}
