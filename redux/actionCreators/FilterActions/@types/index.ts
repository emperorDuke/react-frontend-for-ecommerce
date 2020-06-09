import { Action } from "redux";

export interface FilterAttributeTypes {
    [key:string]:string | boolean | undefined;
    key: string;
    value: string;
    checked?: boolean;
}


export interface FilterKeyTypes {
    [key:string]: Array<FilterAttributeTypes>;
}

export enum filter {
    FILTER_REQUEST = 'FILTER_REQUEST',
    FILTER_SUCCESS = 'FILTER_SUCCESS',
    FILTER_FAILURE = 'FILTER_FAILURE'
}


export interface FilterRequest extends Action {
    type: filter.FILTER_REQUEST;
    payload: string
}

export interface FilterSuccess extends Action {
    type: filter.FILTER_SUCCESS;
    payload: FilterKeyTypes;
}

export interface FilterFailure extends Action {
    type: filter.FILTER_FAILURE;
    payload: string;
}


export type FilterActionTypes = FilterRequest|FilterSuccess|FilterFailure;