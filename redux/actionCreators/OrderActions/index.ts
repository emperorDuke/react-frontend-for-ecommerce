import { ShippingDetailType } from "../AddressActions";
import { Action } from "redux";
import { VariationType } from "../AttributeActions";
import { CartType } from "../CartActions";

export enum order {
  REQUEST = "request",
  FETCH_SUCCESSFUL = "fetch successful",
  FETCH_FAILED = "fetch failed",
}

export interface CouponType {
  code: string;
  amount: number | string;
}

export interface OrderedItemType {
  id?: number;
  order: number;
  name: string;
  product?: number;
  quantity: number;
  price: number | string;
  variants?: Array<VariationType>;
  cart_content?: CartType;
}

export interface PaymentType {
  user: number;
  ref_no: string;
  amount: string | number;
}

export interface OrderType {
  id?: number;
  buyer: number;
  shipping_detail: ShippingDetailType;
  order_status: string;
  refund_status: string;
  coupons: Array<CouponType>;
  items: Array<OrderedItemType>;
  payment: PaymentType;
}

export interface OrderRequestType extends Action {
  type: order.REQUEST;
  payload: string;
}

export interface OrderSuccessfulType extends Action {
  type: order.FETCH_SUCCESSFUL;
  payload: Array<OrderType>;
}

export interface OrderFailedType extends Action {
  type: order.FETCH_FAILED;
  payload: string;
}

export function orderRequest(payload: string) {
  return {
    type: order.REQUEST,
    payload
  };
}

export function orderSuccess(payload: Array<OrderType>) {
  return {
    type: order.FETCH_SUCCESSFUL,
    payload
  };
}

export function orderFailed(payload: string) {
  return {
    type: order.FETCH_FAILED,
    payload
  };
}

export type OrderActionType =
  | OrderRequestType
  | OrderSuccessfulType
  | OrderFailedType;
