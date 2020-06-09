import {
  location,
  LocationRequestTypes,
  LocationSuccessTypes,
  LocationFailureTypes,
  LocationTypes
} from "./@types";

export function LocationRequest(payload: string): LocationRequestTypes {
  return {
    type: location.REQUEST,
    payload
  };
}

export function locationSuccess(payload: Array<string>): LocationSuccessTypes {
  return {
    type: location.SUCCESS,
    payload: payload
  };
}

export function locationFailure(payload: string): LocationFailureTypes {
  return {
    type: location.FAILURE,
    payload: payload
  };
}

export * from "./@types";
