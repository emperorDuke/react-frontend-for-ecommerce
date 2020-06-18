import {
  StoreActionTypes,
  store,
  StoreType,
} from "../../actionCreators/StoreActions/@types";
import { FetchConst, FetchOperationType } from "../../../utils/Fetch/@types";

type StoreReducerState = {
  stores: Array<StoreType>;
  operations: {
    [opName: string]: FetchOperationType;
  };
};

const initialState: StoreReducerState = {
  stores: [],
  operations: {
    fetchStores: {
      status: null,
      error: null,
    },
  },
};

export default function StoreReducer(
  state = initialState,
  action: StoreActionTypes
) {
  switch (action.type) {
    case store.STORE_REQUEST:
      return {
        ...state,
        operations: {
          fetchStores: {
            status: FetchConst.FETCH_IN_PROCESS,
            error: null,
          },
        },
      };
    case store.STORE_SUCCESS:
      return {
        ...state,
        stores: action.payload,
        operations: {
          fetchStores: {
            status: FetchConst.FETCH_SUCCESSFUL,
            error: null,
          },
        },
      };
    case store.STORE_ERROR:
      return {
        ...state,
        operations: {
          fetchStores: {
            status: FetchConst.FETCH_FAILED,
            error: action.payload,
          },
        },
      };
    case store.EXTEND_STORE:
      return {
        ...state,
        stores: addToState(state, action.payload),
      };
    default:
      return state;
  }
}

function addToState(state = initialState, shops: StoreType[]) {
  let nextShops: StoreType[] = [];

  shops.forEach((shop) => {
    const present = state.stores.find(
      (prevShop) => prevShop.id === shop.id
    );
    if (!present) nextShops.push(shop);
  });

  return state.stores.concat(nextShops);
}
