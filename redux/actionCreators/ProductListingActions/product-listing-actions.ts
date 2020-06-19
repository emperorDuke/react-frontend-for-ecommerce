import * as T from "./@types";

export function requestlistings(payload: string): T.RequestListingType {
  return {
    type: T.listing.REQUEST_LISTINGS,
    payload,
  };
}

export function listingSuccessful(
  payload: T.ListingType[]
): T.ListingSuccessfulType {
  return {
    type: T.listing.REQUEST_SUCESSFUL,
    payload,
  };
}

export function listingRequestFailed(payload: string): T.ListingFailureType {
  return {
    type: T.listing.REQUEST_FAILED,
    payload,
  };
}