
export enum post {
  POST_ITEM = "POST_ITEM",
  POST_SUCCESSFUL = "POST_SUCCESSFUL",
  POSTING_FAILED = "POSTING_FAILED"
}

export type PostingPayloadType = {
  url: string;
  body?: {} | FormData;
  reqAuth?: boolean;
  config?: {
    [key: string]: string;
  };
};

export type PostStatus = post | null;

export interface PostOperationType {
  status: PostStatus;
  responseError: string | null | object;
}

export interface PostingType {
  type: post.POST_ITEM;
  payload: PostingPayloadType;
}

export interface PostingSuccessType {
  type: post.POST_SUCCESSFUL;
  payload: any;
}

export interface PostingFailedType {
  type: post.POSTING_FAILED;
  payload: any;
}

export type PostActionTypes =
  | PostingType
  | PostingSuccessType
  | PostingFailedType;
