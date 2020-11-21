import { FetchOperationType, FetchConst } from "../../../utils/Fetch/@types";
import {
  AddressActionTypes,
  address,
  ShippingDetailType,
} from "../../actionCreators/AddressActions";

export interface AddressState {
  shipping: Array<ShippingDetailType>;
  operations: FetchOperationType;
}

const initialState: AddressState = {
  shipping: [],
  operations: { error: null, status: null },
};

export default function addressReducer(
  state = initialState,
  action: AddressActionTypes
): AddressState {
  switch (action.type) {
    case address.REQUEST:
      return {
        ...state,
        operations: { error: null, status: FetchConst.FETCH_IN_PROCESS },
      };
    case address.FETCH_SUCCESSFUL:
      return {
        ...state,
        shipping: action.payload,
        operations: { error: null, status: FetchConst.FETCH_SUCCESSFUL },
      };
    case address.FETCH_FAILED:
      return {
        ...state,
        operations: { error: action.payload, status: FetchConst.FETCH_FAILED },
      };
    case address.UPDATE:
      return {
        ...state,
        shipping: state.shipping.map((prevShipping) => {
          if (prevShipping.id === action.payload.id) {
            return {
              ...prevShipping,
              ...action.payload,
            };
          }
          return prevShipping;
        }),
      };
    case address.ADD:
      return {
        ...state,
        shipping: state.shipping.concat([action.payload]),
      };
    default:
      return state;
  }
}
