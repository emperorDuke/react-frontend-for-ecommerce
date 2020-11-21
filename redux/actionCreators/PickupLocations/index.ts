import { Action } from "redux";
import { AddressType } from "../AddressActions";

export enum PickupLocation {
  REQUEST = "pickup_location_REQUEST",
  REQUEST_SUCCESSFUL = "pickup_location_REQUEST_SUCCESSFUL",
  REQUEST_FAILED = "pickup_location_REQUEST_FAILED"
}

export type PickupLocations = AddressType

interface PickUpLocationFailed extends Action {
  type: PickupLocation.REQUEST_FAILED;
  payload: string;
}

interface RequestPickupLocation extends Action {
  type: PickupLocation.REQUEST;
  payload: string;
}

interface PickupLocationSuccessful extends Action {
  type: PickupLocation.REQUEST_SUCCESSFUL;
  payload: Array<PickupLocations>;
}

export function requestPickupLocations(payload: string): RequestPickupLocation {
  return {
    type: PickupLocation.REQUEST,
    payload
  };
}

export function pickUpLocationSuccessful(
  payload: Array<PickupLocations>
): PickupLocationSuccessful {
  return {
    type: PickupLocation.REQUEST_SUCCESSFUL,
    payload
  };
}

export function pickUpLocationFailed(payload: string): PickUpLocationFailed {
  return {
    type: PickupLocation.REQUEST_FAILED,
    payload
  };
}

export type PickupLocationAction =
  | RequestPickupLocation
  | PickUpLocationFailed
  | PickupLocationSuccessful;
