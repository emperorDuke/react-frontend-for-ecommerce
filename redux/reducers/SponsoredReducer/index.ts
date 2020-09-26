import {
  SponsoredItemsActionType,
  sponsoredProductConstants,
  sponsoredStoreConstants,
  SponsoredStore,
  SponsoredProduct,
} from "../../actionCreators/SponsoredActions";
import { FetchOperationType, FetchConst } from "../../../utils/Fetch";

interface SponsoredItemsState {
  sponsoredStores: Array<SponsoredStore>;
  sponsoredProducts: Array<SponsoredProduct>;
  operations: {
    [key: string]: FetchOperationType;
  };
}

const initialState: SponsoredItemsState = {
  sponsoredStores: [],
  sponsoredProducts: [],
  operations: {
    items: {
      status: null,
      error: null,
    },
  },
};

export default function SponsoredReducer(
  state = initialState,
  action: SponsoredItemsActionType
) {
  switch (action.type) {
    case sponsoredProductConstants.REQUEST:
      return {
        ...state,
        operations: {
          items: {
            status: FetchConst.FETCH_IN_PROCESS,
            error: null,
          },
        },
      };
    case sponsoredProductConstants.SUCCESSFUL:
      return {
        ...state,
        sponsoredProducts: action.payload,
        operations: {
          items: {
            status: FetchConst.FETCH_SUCCESSFUL,
            error: null,
          },
        },
      };
    case sponsoredProductConstants.FAILED:
      return {
        ...state,
        operations: {
          items: {
            status: FetchConst.FETCH_SUCCESSFUL,
            error: action.payload,
          },
        },
      };
      case sponsoredStoreConstants.REQUEST:
      return {
        ...state,
        operations: {
          items: {
            status: FetchConst.FETCH_IN_PROCESS,
            error: null,
          },
        },
      };
    case sponsoredStoreConstants.SUCCESSFUL:
      return {
        ...state,
        sponsoredStores: action.payload,
        operations: {
          items: {
            status: FetchConst.FETCH_SUCCESSFUL,
            error: null,
          },
        },
      };
    case sponsoredStoreConstants.FAILED:
      return {
        ...state,
        operations: {
          items: {
            status: FetchConst.FETCH_SUCCESSFUL,
            error: action.payload,
          },
        },
      };
    default:
      return state;
  }
}
