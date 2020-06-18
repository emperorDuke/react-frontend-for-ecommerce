import {
  PickupLocations,
  PickupLocationActionTypes,
  PickupLocation
} from "../../actionCreators/PickupLocations";
import { FetchOperationType, FetchConst } from "../../../utils/Fetch/@types";

interface PickUpLocationsType {
  pickUpLocations: Array<PickupLocations>;
  operations: {
    [opName: string]: FetchOperationType;
  };
}

const initialState: PickUpLocationsType = {
  pickUpLocations: [],
  operations: {
    fetchPickupLocations: {
      status: null,
      error: null
    }
  }
};

export default function PickupLocationReducer(
  state = initialState,
  action: PickupLocationActionTypes
): PickUpLocationsType {
  switch (action.type) {
    case PickupLocation.REQUEST:
      return {
        ...state,
        operations: {
          fetchPickupLocations: {
            status: FetchConst.FETCH_IN_PROCESS,
            error: null
          }
        }
      };
    case PickupLocation.REQUEST_SUCCESSFUL:
      return {
        ...state,
        pickUpLocations: action.payload,
        operations: {
          fetchPickupLocations: {
            status: FetchConst.FETCH_SUCCESSFUL,
            error: null
          }
        }
      };
    case PickupLocation.REQUEST_FAILED:
      return {
        ...state,
        operations: {
          fetchPickupLocations: {
            status: FetchConst.FETCH_FAILED,
            error: action.payload
          }
        }
      };
    default:
      return state;
  }
}
