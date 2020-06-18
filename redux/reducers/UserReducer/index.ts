import * as T from "../../actionCreators/UserActions";
import { FetchOperationType, FetchConst } from "../../../utils/Fetch/@types";

interface UserState {
  user: T.UserType;
  operations: {
    [key: string]: FetchOperationType;
  };
}

const initialState: UserState = {
  user: Object.create(Object.prototype),
  operations: {
    fetchUser: {
      error: null,
      status: null
    }
  }
};

export default function UserReducer(
  state = initialState,
  action: T.UserActionType
) {
  switch (action.type) {
    case T.user.REQUEST:
      return {
        ...state,
        operations: {
          fetchUser: {
            error: null,
            status: FetchConst.FETCH_IN_PROCESS
          }
        }
      };
    case T.user.FETCH_SUCCESSFUL:
      return {
        ...state,
        user: action.payload,
        operations: {
          fetchUser: {
            error: null,
            status: FetchConst.FETCH_SUCCESSFUL
          }
        }
      };
    case T.user.FETCH_FAILED:
      return {
        ...state,
        operations: {
          fetchUser: {
            error: action.payload,
            status: FetchConst.FETCH_SUCCESSFUL
          }
        }
      };
    default:
      return state;
  }
}
