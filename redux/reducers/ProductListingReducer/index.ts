import {
  ListingActionType,
  ListingType,
  listing,
} from "../../actionCreators/ProductListingActions";
import { FetchOperationType, FetchConst } from "../../../utils/Fetch/@types";

interface ListingState {
  listings: ListingType[];
  operations: {
    [key: string]: FetchOperationType;
  };
}

const initialState: ListingState = {
  listings: [],
  operations: {
    listings: {
      error: null,
      status: null,
    },
  },
};

export function listingReducer(
  state = initialState,
  action: ListingActionType
) {
  switch (action.type) {
    case listing.REQUEST_LISTINGS:
      return {
        ...state,
        operations: {
          listings: {
            error: null,
            status: FetchConst.FETCH_IN_PROCESS,
          },
        },
      };
    case listing.REQUEST_SUCESSFUL:
      return {
        ...state,
        listings: action.payload,
        operations: {
          lisitings: {
            error: null,
            status: FetchConst.FETCH_SUCCESSFUL,
          },
        },
      };
    case listing.REQUEST_FAILED:
      return {
        ...state,
        operations: {
          listings: {
            error: action.payload,
            status: FetchConst.FETCH_FAILED,
          },
        },
      };
    default:
      return state;
  }
}
