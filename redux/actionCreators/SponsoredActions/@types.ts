import { ProductType } from "../ProductActions";
import { StoreType } from "../StoreActions";
import { Action } from "redux";

interface SponsoredItems {
  id?: number;
  start_at: string;
  plan: number;
  payment: number;
  has_expired: boolean;
  status: string;
  ref_no: string;
}

export interface SponsoredProduct extends SponsoredItems {
  product: ProductType;
}

export interface SponsoredStore extends SponsoredItems {
  store: StoreType;
  products: ProductType[];
}

export interface Request<T = any, P = string> extends Action {
  type: T;
  payload: P;
}

export interface Successful<T = any, P = string> extends Action {
  type: T;
  payload: P;
}

export interface Failure<T = any, P = string> extends Action {
  type: T;
  payload: P;
}

export enum sponsoredProductConstants {
  REQUEST = "request sponsored products",
  SUCCESSFUL = "sponsored products request successful",
  FAILED = "sponsored products request failed",
}

export enum sponsoredStoreConstants {
  REQUEST = "request sponsored stores",
  SUCCESSFUL = "sponsored stores request successful",
  FAILED = "sponsored stores request failed",
}


export type SponsoredItemsActionType =
  | Request<sponsoredProductConstants.REQUEST>
  | Successful<sponsoredProductConstants.SUCCESSFUL, SponsoredProduct[]>
  | Failure<sponsoredProductConstants.FAILED>
  | Request<sponsoredStoreConstants.REQUEST>
  | Successful<sponsoredStoreConstants.SUCCESSFUL, SponsoredStore[]>
  | Failure<sponsoredStoreConstants.FAILED>;
