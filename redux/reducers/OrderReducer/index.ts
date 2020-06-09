import {
  OrderType,
  OrderActionType,
  order
} from "../../actionCreators/OrderActions";
import { FetchOperationType, FetchConst } from "../../../service/Fetch/@types";

interface OrderState {
  orders: Array<OrderType>;
  operations: {
    [key: string]: FetchOperationType;
  };
}

const initialState: OrderState = {
  orders: [],
  operations: {
    fetchOrder: {
      status: null,
      error: null
    }
  }
};

export default function orderReducer(
  state = initialState,
  action: OrderActionType
) {
  switch (action.type) {
    case order.REQUEST:
      return {
        ...state,
        operations: {
          fetchOrder: {
            status: FetchConst.FETCH_IN_PROCESS,
            error: null
          }
        }
      };
    case order.FETCH_SUCCESSFUL:
      return {
        ...state,
        orders: action.payload,
        operations: {
          fetchOrder: {
            status: FetchConst.FETCH_SUCCESSFUL,
            error: null
          }
        }
      };
    case order.FETCH_FAILED:
      return {
        ...state,
        operations: {
          fetchOrder: {
            status: FetchConst.FETCH_FAILED,
            error: action.payload
          }
        }
      };

    default:
      return state;
  }
}
