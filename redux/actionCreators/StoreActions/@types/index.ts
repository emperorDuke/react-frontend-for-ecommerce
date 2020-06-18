import { RatingType } from "../../ProductActions";
import { AddressType } from "../../AddressActions";
import { Action } from "redux";

export interface AdvertType {
  [key: string]: string | number | undefined;
  id?: number;
  store: number;
  attachment?: string;
  text?: string;
}

export interface StoreRatingType extends RatingType {
  store: number;
}

export interface StoreType {
  [key: string]:
    | string
    | undefined
    | StoreRatingType
    | number
    | Array<AdvertType>
    | AddressType;
  id?: number;
  name: string;
  logo?: string;
  rating: StoreRatingType;
  merchant: number;
  address: AddressType;
  adverts?: Array<AdvertType>;
}

export enum store {
  STORE_REQUEST = "STORE_REQUEST",
  STORE_SUCCESS = "STORE_SUCCESS",
  STORE_ERROR = "STORE_ERROR",
  EXTEND_STORE = "EXTEND STORE"
}

export interface StoreRequestType {
  type: store.STORE_REQUEST;
  payload: string;
}

export interface StoreSuccessType {
  type: store.STORE_SUCCESS;
  payload: Array<StoreType>;
}

export interface StoreFailureType {
  type: store.STORE_ERROR;
  payload: string;
}

export interface ExtendStores extends Action {
  type: store.EXTEND_STORE;
  payload: StoreType[];
}

export type StoreActionTypes =
  | StoreRequestType
  | StoreSuccessType
  | ExtendStores
  | StoreFailureType;
