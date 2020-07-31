import { Action } from "redux";

export enum meta {
  META_REQUEST = "META_REQUEST",
  META_SUCESSFUL = "META_SUCESSFUL",
  META_ERROR = "META_ERROR"
}

export interface SpecificationType {
  id?: number;
  product: number;
  type: string;
  value: string;
}

export interface KeyFeatureType {
  id?: number;
  product: number;
  feature?: string;
}

export interface MetaType {
  specifications: Array<SpecificationType>;
  key_features: Array<KeyFeatureType>;
}

export interface MeteRequest extends Action {
  type: meta.META_REQUEST;
  payload: string;
}

export interface MetaSucess extends Action {
  type: meta.META_SUCESSFUL;
  payload: MetaType[];
}

export interface MetaFailure extends Action {
  type: meta.META_ERROR;
  payload: string;
}

export type MetaActionType = MeteRequest | MetaSucess | MetaFailure;
