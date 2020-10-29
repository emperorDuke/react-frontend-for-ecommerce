import {
  post,
  PostActionTypes,
  PostOperationType,
} from "../../actionCreators/PostActions/@types";

export interface PostReducerState extends PostOperationType {
  success: string | {} | null;
}

const initialState: PostReducerState = {
  success: null,
  status: null,
  error: null,
};

export default function PostReducer(
  state = initialState,
  action: PostActionTypes
) {
  switch (action.type) {
    case post.POST_ITEM:
      return {
        ...state,
        status: post.POST_ITEM,
        error: null,
      };
    case post.POST_SUCCESSFUL:
      return {
        ...state,
        success: action.payload,
        status: post.POST_SUCCESSFUL,
        error: null,
      };
    case post.POSTING_FAILED:
      return {
        ...state,
        success: null,
        status: post.POSTING_FAILED,
        error: action.payload,
      };
    default:
      return state;
  }
}
