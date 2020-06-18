import { Action } from "redux";

export type RatingType = {
  [key: string]: string | number;
  average_rating: string;
  n_one_star_votes: number;
  n_two_stars_votes: number;
  n_three_stars_votes: number;
  n_four_stars_votes: number;
  n_five_stars_votes: number;
  n_votes: number;
}

export interface ProductRatingType extends RatingType {
  product: number;
};

export type ProductType = {
  [key: string]: string | undefined | number | ProductRatingType | boolean;
  id?: number;
  store: number;
  name: string;
  price: string | number;
  discount?: string | number;
  category: string;
  brand: string;
  availability: string;
  sku?: string;
  attachment_1: string;
  attachment_2?: string;
  attachment_3?: string;
  attachment_4?: string;
  description_text: string;
  description_attachment_1?: string;
  description_attachment_2?: string;
  rating: ProductRatingType;
}

export enum product {
  PRODUCT_REQUEST = "PRODUCT_REQUEST",
  PRODUCT_SUCCESS = "PRODUCT_SUCCESS",
  PRODUCT_ERROR = "PRODUCT_ERROR",
  EXTEND_PRODUCTS = "extend products"
}

export interface ProductSuccess extends Action {
  type: product.PRODUCT_SUCCESS;
  payload: Array<ProductType>;
}

export interface ProductFailure extends Action {
  type: product.PRODUCT_ERROR;
  payload: string;
}

export interface ProductRequest extends Action {
  type: product.PRODUCT_REQUEST;
  payload: string;
}

export interface ExtendProducts extends Action {
  type: product.EXTEND_PRODUCTS;
  payload: ProductType[];
}

export type ProductActionType =
  | ProductRequest
  | ProductSuccess
  | ExtendProducts
  | ProductFailure;
