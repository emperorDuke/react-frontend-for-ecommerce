import { Action } from "redux";

export interface AddressType {
  [key: string]: string | number | undefined;
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
  FETCH_FAILED = "fetch failed",
  UPDATE = "update_address",
  REMOVE = "remove_address",
  ADD = "add_address"
}

export interface RequestAddressType extends Action {
  type: address.REQUEST;
  payload: string;
}

export interface AddressSuccessfulType extends Action {
  type: address.FETCH_SUCCESSFUL;
  payload: Array<ShippingDetailType>;
}

export interface AddressFailedType extends Action {
  type: address.FETCH_FAILED;
  payload: string;
}

export interface UpdateAddressType extends Action {
  type: address.UPDATE;
  payload: ShippingDetailType;
}

export interface RemoveAddressType extends Action {
  type: address.REMOVE,
  payload: string;
}

export interface AddAddressType extends Action {
  type: address.ADD;
  payload: ShippingDetailType
}

export type AddressActionTypes =
  | RequestAddressType
  | AddressSuccessfulType
  | AddressFailedType
  | UpdateAddressType
  | RemoveAddressType
  | AddAddressType;
