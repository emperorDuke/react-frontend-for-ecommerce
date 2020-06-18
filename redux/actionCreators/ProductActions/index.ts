import * as T from "./@types";

export function productRequest(payload: string): T.ProductRequest {
  return {
    type: T.product.PRODUCT_REQUEST,
    payload,
  };
}

export function productSuccess(
  payload: Array<T.ProductType>
): T.ProductSuccess {
  return {
    type: T.product.PRODUCT_SUCCESS,
    payload,
  };
}

export function productFailure(payload: string): T.ProductFailure {
  return {
    type: T.product.PRODUCT_ERROR,
    payload,
  };
}

export function extendProducts(payload: T.ProductType[]):T.ExtendProducts {
  return {
    type: T.product.EXTEND_PRODUCTS,
    payload,
  };
}

export * from "./@types";
