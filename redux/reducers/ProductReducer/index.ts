import * as T from "../../actionCreators/ProductActions/@types";
import { FetchOperationType, FetchConst } from "../../../utils/Fetch/@types";

export type ProductReducerState = {
  products: Array<T.ProductType>;
  operations: {
    [opName: string]: FetchOperationType;
  };
};

const initialState: ProductReducerState = {
  products: [],
  operations: {
    fetchProducts: {
      status: null,
      error: null,
    },
  },
};

export default function ProductReducer(
  state = initialState,
  action: T.ProductActionType
) {
  switch (action.type) {
    case T.product.PRODUCT_REQUEST:
      return {
        ...state,
        operations: {
          fetchProducts: {
            status: FetchConst.FETCH_IN_PROCESS,
            error: null,
          },
        },
      };
    case T.product.PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
        operations: {
          fetchProducts: {
            status: FetchConst.FETCH_SUCCESSFUL,
            error: null,
          },
        },
      };
    case T.product.PRODUCT_ERROR:
      return {
        ...state,
        operations: {
          fetchProducts: {
            status: FetchConst.FETCH_FAILED,
            error: action.payload,
          },
        },
      };
    case T.product.EXTEND_PRODUCTS:
      return {
        ...state,
        products: addToState(state, action.payload)
      };
    default:
      return state;
  }
}

function addToState(state = initialState, products: Array<T.ProductType>) {
  let nextProducts:T.ProductType[] = [];

  products.forEach((product) => {
    const present = state.products.find(
      (prevProduct) => prevProduct.id === product.id
    );
    if (!present) nextProducts.push(product);
  });
  
  return state.products.concat(nextProducts);
}
