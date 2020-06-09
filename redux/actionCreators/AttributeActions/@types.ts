import { Action } from "redux";

export interface VariationType {
  [key: string]: string | undefined | number;
  id?: number;
  attribute: number;
  vendor_metric: string;
  metric_verbose_name?: string;
  attachment?: string;
}

export interface AttributeType {
  [key: string]: string | Array<VariationType> | number | undefined;
  id?: number;
  product: number;
  name: string;
  variants: Array<VariationType>;
}

export enum attribute {
  ATTRIBUTE_REQUEST = "ATTRIBUTE_REQUEST",
  ATTRIBUTE_SUCCESS = "ATTRIBUTE_SUCCESS",
  ATTRIBUTE_ERROR = "ATTRIBUTE_ERROR"
}

export interface AttributeRequest extends Action {
  type: attribute.ATTRIBUTE_REQUEST;
  payload: string;
}

export interface AttributeSuccess extends Action {
  type: attribute.ATTRIBUTE_SUCCESS;
  payload: Array<AttributeType>;
}

export interface AttributeFailure extends Action {
  type: attribute.ATTRIBUTE_ERROR;
  payload: string;
}

export type AttributeActionType =
  | AttributeRequest
  | AttributeSuccess
  | AttributeFailure;
