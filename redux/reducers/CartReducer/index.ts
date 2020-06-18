import {
  CartActionTypes,
  cart,
  CartType
} from "../../actionCreators/CartActions";
import { FetchOperationType, FetchConst } from "../../../utils/Fetch/@types";

interface CartState {
  cart: Array<CartType>;
  operations: {
    [opName: string]: FetchOperationType;
  };
}

const initialState: CartState = {
  cart: [],
  operations: {
    fetchCart: {
      status: null,
      error: null
    }
  }
};

export default function cartReducer(
  state = initialState,
  action: CartActionTypes
) {
  switch (action.type) {
    case cart.ADD_ITEM:
      return {
        ...state,
        cart: [...state.cart, { ...action.payload }].map((cart, i) => {
          cart["index"] = i;
          return cart;
        })
      };
    case cart.UPDATE_CART:
      return {
        ...state,
        cart: state.cart.map(cart => {
          if (cart.index === action.payload.index) {
            return { ...cart, ...action.payload };
          }
          return cart;
        })
      };
    case cart.REQUEST:
      return {
        ...state,
        operations: {
          fetchCart: {
            status: FetchConst.FETCH_IN_PROCESS,
            error: null
          }
        }
      };
    case cart.FETCH_SUCCESSFUL:
      return {
        ...state,
        cart: action.payload,
        operations: {
          fetchCart: {
            status: FetchConst.FETCH_SUCCESSFUL,
            error: null
          }
        }
      };
    case cart.FETCH_FAILED:
      return {
        ...state,
        operations: {
          fetchCart: {
            status: FetchConst.FETCH_FAILED,
            error: action.payload
          }
        }
      };
    case cart.LOAD_CART:
      return {
        ...state,
        cart: state.cart.map((cart, i) => {
          cart["index"] = i;
          return cart;
        })
      };
    case cart.REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter(cart => cart.index !== action.payload.index)
      };
    default:
      return state;
  }
}
