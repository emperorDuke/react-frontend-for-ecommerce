import {
  PickupStation,
  PickupLocationAction,
  PickupLocation,
} from "../../actionCreators/PickupLocations";
import { FetchOperationType, FetchConst } from "../../../utils/Fetch/@types";

export interface PickUpLocationState {
  pickUpLocations: Array<PickupStation>;
  operations: FetchOperationType;
}

const initialState: PickUpLocationState = {
  pickUpLocations: [],
  operations: { status: null, error: null },
};

export default function PickupLocationReducer(
  state = initialState,
  action: PickupLocationAction
): PickUpLocationState {
  switch (action.type) {
    case PickupLocation.REQUEST:
      return {
        ...state,
        operations: { status: FetchConst.FETCH_IN_PROCESS, error: null },
      };
    case PickupLocation.REQUEST_SUCCESSFUL:
      return {
        ...state,
        pickUpLocations: action.payload,
        operations: { status: FetchConst.FETCH_SUCCESSFUL, error: null },
      };
    case PickupLocation.REQUEST_FAILED:
      return {
        ...state,
        operations: { status: FetchConst.FETCH_FAILED, error: action.payload },
      };
    default:
      return state;
  }
}
