import { Action } from "redux";
import { ProductType } from "../ProductActions";

export type ListingType = {
  [key: string]: ProductType[];
};

export enum listing {
  REQUEST_LISTINGS = "request listing",
  REQUEST_SUCESSFUL = "listing request successful",
  REQUEST_FAILED = "lisitng request failed",
}

export interface RequestListingType extends Action {
  type: listing.REQUEST_LISTINGS;
  payload: string;
}

export interface ListingSuccessfulType extends Action {
  type: listing.REQUEST_SUCESSFUL;
  payload: ListingType[];
}

export interface ListingFailureType extends Action {
  type: listing.REQUEST_FAILED;
  payload: string;
}

export function requestlistings(payload: string): RequestListingType {
  return {
    type: listing.REQUEST_LISTINGS,
    payload,
  };
}

export function listingSuccessful(
  payload: ListingType[]
): ListingSuccessfulType {
  return {
    type: listing.REQUEST_SUCESSFUL,
    payload,
  };
}

export function listingRequestFailed(payload: string): ListingFailureType {
  return {
    type: listing.REQUEST_FAILED,
    payload,
  };
}

export type ListingActionType =
  | RequestListingType
  | ListingSuccessfulType
  | ListingFailureType;
