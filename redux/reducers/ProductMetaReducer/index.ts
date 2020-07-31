import { MetaStateType } from "./@types";
import { MetaActionType, meta } from "../../actionCreators/ProductMetaActions";
import { FetchConst } from "../../../utils/Fetch/@types";

const initialState: MetaStateType = {
  productMeta: {
    key_features: [],
    specifications: []
  },
  operations: {
    fetchMetas: {
      error: null,
      status: null
    }
  }
};

export default function MetaReducer(
  state = initialState,
  action: MetaActionType
) {
  switch (action.type) {
    case meta.META_REQUEST:
      return {
        ...state,
        operations: {
          fetchMetas: {
            error: null,
            status: FetchConst.FETCH_IN_PROCESS
          }
        }
      };
    case meta.META_SUCESSFUL:
      return {
        ...state,
        productMeta: action.payload[0],
        operations: {
          fetchMetas: {
            status: FetchConst.FETCH_SUCCESSFUL,
            error: null
          }
        }
      };
    case meta.META_ERROR:
      return {
        ...state,
        operations: {
          fetchMetas: {
            status: FetchConst.FETCH_FAILED,
            error: action.payload
          }
        }
      };
    default:
      return state;
  }
}
