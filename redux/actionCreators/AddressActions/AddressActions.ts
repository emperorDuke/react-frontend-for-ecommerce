import * as T from "./@types";

export function requestAddress(payload: string): T.RequestAddressType {
  return {
    type: T.address.REQUEST,
    payload,
  };
}

export function addressSuccessful(
  payload: Array<T.ShippingDetailType>
): T.AddressSuccessfulType {
  return {
    type: T.address.FETCH_SUCCESSFUL,
    payload,
  };
}

export function addressFailed(payload: string): T.AddressFailedType {
  return {
    type: T.address.FETCH_FAILED,
    payload,
  };
}

export function updateAddress(
  payload: T.ShippingDetailType
): T.UpdateAddressType {
  return {
    type: T.address.UPDATE,
    payload,
  };
}

export function removeAddress(payload: string): T.RemoveAddressType {
  return {
    type: T.address.REMOVE,
    payload,
  };
}

export function addAddress(payload: T.ShippingDetailType): T.AddAddressType {
  return {
    type: T.address.ADD,
    payload,
  };
}
