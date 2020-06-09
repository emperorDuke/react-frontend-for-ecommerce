import * as T from "./@types";

// function sortPayload(payload: PurchaseDetails) {
//   const { product, quantity, variants, index, trackId } = payload;

//   const price = product.discount_price
//     ? Number(product.discount_price)
//     : Number(product.price);

//   const newPayload = {
//     index: index,
//     productId: product.id,
//     name: product.name,
//     qty: quantity,
//     unitPrice: price,
//     subtotalPrice: quantity > 1 ? quantity * price : price,
//     variants: variants,
//     image: product.image_1,
//     link: typeof product.link === "string" ? product.link : "/",
//     seller: (product.store as StoreType).name,
//     trackId: trackId,
//     href: product.href,
//     as: product.as
//   };

//   return newPayload;
// }

export function addToCart(payload: T.CartType): T.AddToCartType {

  return {
    type: T.cart.ADD_ITEM,
    payload
  };
}

export function updateCart(payload: T.CartType): T.UpdateCartType {
  return {
    type: T.cart.UPDATE_CART,
    payload
  };
}

export function requestCart(): T.RequestCartType {
  return {
    type: T.cart.REQUEST
  };
}

export function cartRequestSuccessful(
  payload: Array<T.CartType>
): T.CartRequestSuccessfulType {

  return {
    type: T.cart.FETCH_SUCCESSFUL,
    payload
  };
}

export function cartRequestFailed(payload: string): T.CartRequestFailed {
  return {
    type: T.cart.FETCH_FAILED,
    payload
  };
}

export function loadCart(payload: Array<T.CartType>): T.LoadCartType {
  return {
    type: T.cart.LOAD_CART,
    payload
  }
}

export function removeItem(payload?: number) {
  return {
    type: T.cart.REMOVE_ITEM,
    payload
  }
}

export * from "./@types";
