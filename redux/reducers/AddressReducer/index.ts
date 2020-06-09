import { FetchOperationType, FetchConst } from "../../../service/Fetch/@types";
import {
  AddressActionTypes,
  address,
  ShippingDetailType
} from "../../actionCreators/AddressActions";

interface AddressState {
  shippingDetail: Array<ShippingDetailType>;
  operations: {
    [opName: string]: FetchOperationType;
  };
}

const initialState: AddressState = {
  shippingDetail: [],
  operations: {
    fetchAddress: {
      error: null,
      status: null
    }
  }
};

export default function addressReducer(
  state = initialState,
  action: AddressActionTypes
) {
  switch (action.type) {
    case address.REQUEST:
      return {
        ...state,
        operations: {
          fetchAddress: {
            error: null,
            status: FetchConst.FETCH_IN_PROCESS
          }
        }
      };
    case address.FETCH_SUCCESSFUL:
      return {
        ...state,
        shippingDetail: action.payload,
        operations: {
          fetchAddress: {
            error: null,
            status: FetchConst.FETCH_SUCCESSFUL
          }
        }
      };
    case address.FETCH_FAILED:
      return {
        ...state,
        operations: {
          fetchAddress: {
            error: action.payload,
            status: FetchConst.FETCH_FAILED
          }
        }
      };
    default:
      return state;
  }
}
