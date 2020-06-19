import { ActionCreator } from "redux";
import * as T from "./@types";


export const sponsoredProductRequest: ActionCreator<T.Request<
  T.sponsoredProductConstants.REQUEST
>> = (payload) => ({
  type: T.sponsoredProductConstants.REQUEST,
  payload,
});

export const sponsoredProductSuccess: ActionCreator<T.Successful<
  T.sponsoredProductConstants.SUCCESSFUL,
  T.SponsoredProduct[]
>> = (payload) => ({
  type: T.sponsoredProductConstants.SUCCESSFUL,
  payload,
});

export const sponsoredProductFailed: ActionCreator<T.Failure<
  T.sponsoredProductConstants.FAILED
>> = (payload) => ({
  type: T.sponsoredProductConstants.FAILED,
  payload,
});

export const sponsoredStoreRequest: ActionCreator<T.Request<
  T.sponsoredStoreConstants.REQUEST
>> = (payload) => ({
  type: T.sponsoredStoreConstants.REQUEST,
  payload,
});

export const sponsoredStoreSuccess: ActionCreator<T.Successful<
  T.sponsoredStoreConstants.SUCCESSFUL,
  T.SponsoredStore[]
>> = (payload) => ({
  type: T.sponsoredStoreConstants.SUCCESSFUL,
  payload,
});

export const sponsoredStoreFailure: ActionCreator<T.Failure<
  T.sponsoredStoreConstants.FAILED
>> = (payload) => ({
  type: T.sponsoredStoreConstants.FAILED,
  payload,
});
