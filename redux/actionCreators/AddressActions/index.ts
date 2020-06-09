import { Action } from "redux";

export interface AddressType {
  [key: string]: string | number | boolean | undefined;
  id?: number;
  address: string;
  country: string;
  city: string;
  state: string;
  zip_code: string;
}

export interface ShippingDetailType {
  [key: string]: string | number | boolean | undefined | AddressType;
  id?: number;
  buyer?: number;
  address: AddressType;
  default?: boolean;
  first_name: string;
  middle_name?: string;
  last_name: string;
  phone_number: string;
  added_at?: string;
}

export enum address {
  REQUEST = "request",
  FETCH_SUCCESSFUL = "fetch successful",
  FETCH_FAILED = "fetch failed"
}

interface RequestAddressType extends Action {
  type: address.REQUEST;
  payload: string;
}

interface AddressSuccessfulType extends Action {
  type: address.FETCH_SUCCESSFUL;
  payload: Array<ShippingDetailType>;
}

interface AddressFailedType extends Action {
  type: address.FETCH_FAILED;
  payload: string;
}

export function requestAddress(payload: string): RequestAddressType {
  return {
    type: address.REQUEST,
    payload
  };
}

export function addressSuccessful(
  payload: Array<ShippingDetailType>
): AddressSuccessfulType {
  return {
    type: address.FETCH_SUCCESSFUL,
    payload
  };
}

export function addressFailed(payload: string): AddressFailedType {
  return {
    type: address.FETCH_FAILED,
    payload
  };
}

export type AddressActionTypes =
  | RequestAddressType
  | AddressSuccessfulType
  | AddressFailedType;
