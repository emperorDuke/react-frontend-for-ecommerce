import { AttributeState } from "./@types";
import * as T from "../../actionCreators/AttributeActions/@types";
import { FetchConst } from "../../../service/Fetch/@types";

const initialState: AttributeState = {
  attributes: [],
  operations: {
    fetchAttributes: {
      status: null,
      error: null
    }
  }
};

export default function AttributeReducer(
  state = initialState,
  action: T.AttributeActionType
) {
  switch (action.type) {
    case T.attribute.ATTRIBUTE_REQUEST:
      return {
        ...state,
        operations: {
          fetchAttributes: {
            status: FetchConst.FETCH_IN_PROCESS,
            error: null
          }
        }
      };
    case T.attribute.ATTRIBUTE_SUCCESS:
      return {
        ...state,
        attributes: action.payload,
        operations: {
          fetchAttributes: {
            status: FetchConst.FETCH_SUCCESSFUL,
            error: null
          }
        }
      };
    case T.attribute.ATTRIBUTE_ERROR:
      return {
        ...state,
        operations: {
          fetchAttributes: {
            status: FetchConst.FETCH_FAILED,
            error: action.payload
          }
        }
      };
    default:
      return state;
  }
}
