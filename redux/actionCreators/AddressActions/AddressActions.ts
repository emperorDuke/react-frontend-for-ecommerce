import * as T from "./@types";


export function requestAddress(payload: string): T.RequestAddressType {
  return {
    type: T.address.REQUEST,
    payload
  };
}

export function addressSuccessful(
  payload: Array<T.ShippingDetailType>
): T.AddressSuccessfulType {
  return {
    type: T.address.FETCH_SUCCESSFUL,
    payload
  };
}

export function addressFailed(payload: string): T.AddressFailedType {
  return {
    type: T.address.FETCH_FAILED,
    payload
  };
}


