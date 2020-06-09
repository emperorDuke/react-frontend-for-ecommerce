

export type LocationTypes = {
    [key:string]: string;
    state: string;
}


export enum location {
    REQUEST = 'LOCATION_REQUEST',
    SUCCESS = 'LOCATION_SUCCESS',
    FAILURE = 'LOCATION_FAILURE',
}


export type LocationRequestTypes = {
    type: location.REQUEST;
    payload: string;
}

export type LocationSuccessTypes = {
    type: location.SUCCESS;
    payload: Array<string>;
}

export type LocationFailureTypes = {
    type: location.FAILURE;
    payload: string;
}


export type LocationActionTypes = LocationRequestTypes | LocationSuccessTypes | LocationFailureTypes;