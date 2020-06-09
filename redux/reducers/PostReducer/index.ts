import {
  post,
  PostActionTypes,
  PostOperationType
} from "../../actionCreators/PostActions/@types";

export type PostReducerState = {
  sucessMessage: string | {} | null;
  operations: {
    [opName: string]: PostOperationType;
  };
};

const initialState: PostReducerState = {
  sucessMessage: null,
  operations: {
    postItem: {
      status: null,
      responseError: null
    }
  }
};

export default function PostReducer(
  state = initialState,
  action: PostActionTypes
) {
  switch (action.type) {
    case post.POST_ITEM:
      return {
        ...state,
        operations: {
          postItem: {
            status: post.POST_ITEM,
            responseError: null
          }
        }
      };
    case post.POST_SUCCESSFUL:
      return {
        ...state,
        sucessMessage: action.payload,
        operations: {
          postItem: {
            status: post.POST_SUCCESSFUL,
            responseError: null
          }
        }
      };
    case post.POSTING_FAILED:
      return {
        ...state,
        sucessMessage: null,
        operations: {
          postItem: {
            status: post.POSTING_FAILED,
            responseError: action.payload
          }
        }
      };
    default:
      return state;
  }
}
