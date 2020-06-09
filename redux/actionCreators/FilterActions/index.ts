import { ActionCreator } from 'redux';
import { FilterFailure, FilterRequest, FilterSuccess, filter, FilterKeyTypes } from './@types'


export const filterRequest:ActionCreator<FilterRequest> = (payload) => {
    return {
        type: filter.FILTER_REQUEST,
        payload
    }
}

export const filterSuccess:ActionCreator<FilterSuccess> = (payload) => {
    return {
        type: filter.FILTER_SUCCESS,
        payload
    }
}

export const filterFailure:ActionCreator<FilterFailure> = (payload) => {
    return {
        type: filter.FILTER_FAILURE,
        payload
    }
}

export * from './@types';