import * as T from "./@types";

export function addToCart(payload: T.CartType): T.AddToCartType {
  return {
    type: T.cart.ADD_ITEM,
    payload,
  };
}

export function updateCart(payload: T.CartType): T.UpdateCartType {
  return {
    type: T.cart.UPDATE_CART,
    payload,
  };
}

export function requestCart(): T.RequestCartType {
  return {
    type: T.cart.REQUEST,
  };
}

export function cartRequestSuccessful(
  payload: Array<T.CartType>
): T.CartRequestSuccessfulType {
  return {
    type: T.cart.FETCH_SUCCESSFUL,
    payload,
  };
}

export function cartRequestFailed(payload: string): T.CartRequestFailed {
  return {
    type: T.cart.FETCH_FAILED,
    payload,
  };
}

export function loadCart(payload: Array<T.CartType>): T.LoadCartType {
  return {
    type: T.cart.LOAD_CART,
    payload,
  };
}

export function removeItem(payload: Pick<T.CartType, "_index" | "id">): T.RemoveCartType {
  return {
    type: T.cart.REMOVE_ITEM,
    payload,
  };
}

export * from "./@types";
