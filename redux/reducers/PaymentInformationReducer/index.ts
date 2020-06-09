import { FetchOperationType, FetchConst } from "../../../service/Fetch/@types";
import {
  PaymentInformationActionTypes,
  paymentInformation,
  PaymentInformation
} from "../../actionCreators/PaymenInformation";

interface PaymentInformationState {
  paymentInformation: Array<PaymentInformation>;
  operations: {
    [opName: string]: FetchOperationType;
  };
}

const initialState: PaymentInformationState = {
  paymentInformation: [],
  operations: {
    paymentInformation: {
      error: null,
      status: null
    }
  }
};

export default function PaymentInformationReducer(
  state = initialState,
  action: PaymentInformationActionTypes
): PaymentInformationState {
  switch (action.type) {
    case paymentInformation.REQUEST:
      return {
        ...state,
        operations: {
          paymentInformation: {
            error: null,
            status: FetchConst.FETCH_IN_PROCESS
          }
        }
      };
    case paymentInformation.FETCH_SUCCESSFUL:
      return {
        ...state,
        paymentInformation: action.payload,
        operations: {
          paymentInformation: {
            error: null,
            status: FetchConst.FETCH_SUCCESSFUL
          }
        }
      };
    case paymentInformation.FETCH_FAILED:
      return {
        ...state,
        operations: {
          paymentInformation: {
            error: action.payload,
            status: FetchConst.FETCH_FAILED
          }
        }
      };
    default:
      return state;
  }
}
