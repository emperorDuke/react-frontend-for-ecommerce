import { Action } from "redux";


export type CategoryTypes = {
    name: string;
    track_id: string;
    children: Array<{
        name: string;
        track_id: string;
        children: Array<{
            name: string;
            track_id: string;
            children: null
        }>
    }>
}

export enum category {
    REQUEST = 'REQUEST',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
}


export interface CategoryRequestTypes extends Action {
    type: category.REQUEST;
    payload: string;
}

export interface CategorySuccessTypes extends Action {
    type: category.SUCCESS;
    payload: Array<CategoryTypes>;
}

export interface CategoryFailureTypes extends Action {
    type: category.FAILURE;
    payload: string;
}


export type CategoryActionTypes =  CategoryRequestTypes |CategorySuccessTypes | CategoryFailureTypes ;
                                   