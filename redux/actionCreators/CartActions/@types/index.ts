import { Action } from "redux";
import { VariationType } from "../../AttributeActions";

export enum cart {
  ADD_ITEM = "ADD_ITEM",
  LOAD_CART = "LOAD_CART",
  REQUEST = "REQUEST",
  FETCH_SUCCESSFUL = "FETCH_SUCCESSFUL",
  FETCH_FAILED = "FETCH_FAILED",
  UPDATE_CART = "UPDATE_CART",
  REMOVE_ITEM = "REMOVE_ITEM",
}

export interface CartType {
  id?: number;
  buyer?: number;
  product: number;
  quantity: number;
  price: string | number;
  variants: Array<VariationType>;
  index?: number;
}

export interface AddToCartType extends Action {
  type: cart.ADD_ITEM;
  payload: CartType;
}

export interface UpdateCartType extends Action {
  type: cart.UPDATE_CART;
  payload: CartType;
}

export interface RequestCartType extends Action {
  type: cart.REQUEST;
}

export interface CartRequestSuccessfulType extends Action {
  type: cart.FETCH_SUCCESSFUL;
  payload: Array<CartType>;
}

export interface CartRequestFailed extends Action {
  type: cart.FETCH_FAILED;
  payload: string;
}

export interface LoadCartType extends Action {
  type: cart.LOAD_CART;
  payload: Array<CartType>;
}

export interface RemoveCartType extends Action {
  type: cart.REMOVE_ITEM;
  payload: Pick<CartType, "index" | "id">;
}

export type CartActionTypes =
  | AddToCartType
  | RequestCartType
  | CartRequestFailed
  | CartRequestSuccessfulType
  | LoadCartType
  | RemoveCartType
  | UpdateCartType;
