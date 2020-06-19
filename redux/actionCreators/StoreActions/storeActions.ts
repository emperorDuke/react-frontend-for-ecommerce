import * as T from "./@types";

export function storeRequest(payload: string): T.StoreRequestType {
    return {
      type: T.store.STORE_REQUEST,
      payload
    };
  }
  
  export function storeSuccess(payload: Array<T.StoreType>): T.StoreSuccessType {
    return {
      type: T.store.STORE_SUCCESS,
      payload
    };
  }
  
  export function storeFailure(payload: string): T.StoreFailureType {
    return {
      type: T.store.STORE_ERROR,
      payload
    };
  }
  
  
  export function extendStores(payload: T.StoreType[]): T.ExtendStores {
    return {
      type: T.store.EXTEND_STORE,
      payload
    }
  }