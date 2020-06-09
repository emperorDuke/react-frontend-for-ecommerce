import { Action } from "redux";

export enum paymentInformation {
  REQUEST = "request",
  FETCH_SUCCESSFUL = "fetch_successful",
  FETCH_FAILED = "fetch_failed"
}

export interface PaymentInformation {
  cardNo: number;
  cardType: "master" | "visa" | "verve";
  cvv: number;
  date: string;
}

interface RequestPaymentInformationType extends Action {
  type: paymentInformation.REQUEST;
  payload: string;
}

interface PaymentInformationSuccesfulType extends Action {
  type: paymentInformation.FETCH_SUCCESSFUL;
  payload: Array<PaymentInformation>;
}

interface PaymentInformationFailedType extends Action {
  type: paymentInformation.FETCH_FAILED;
  payload: string;
}

export function requestPaymentInformation(
  payload: string
): RequestPaymentInformationType {
  return {
    type: paymentInformation.REQUEST,
    payload
  };
}

export function paymentInformationSuceesful(
  payload: Array<PaymentInformation>
): PaymentInformationSuccesfulType {
  return {
    type: paymentInformation.FETCH_SUCCESSFUL,
    payload: payload
  };
}

export function paymentInformationFailed(
  payload: string
): PaymentInformationFailedType {
  return {
    type: paymentInformation.FETCH_FAILED,
    payload
  };
}

export type PaymentInformationActionTypes =
  | RequestPaymentInformationType
  | PaymentInformationSuccesfulType
  | PaymentInformationFailedType;
