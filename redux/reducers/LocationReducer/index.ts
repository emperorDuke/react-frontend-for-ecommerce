import { Reducer } from 'redux';
import { LocationReducerType } from './@types'
import { LocationActionTypes, location } from "../../actionCreators/LocationActions/@types";
import { FetchConst } from '../../../utils/Fetch/@types';


const initialState = {
    locations: [],
    operations: {
        fetchLocations:{
            status: null,
            error: null
        }
    }
}

const LocationReducer:Reducer<LocationReducerType, LocationActionTypes> = (state=initialState, action) => {
    switch (action.type) {
        case location.REQUEST:
            return {
                ...state,
                operations: {
                    fetchLocations: {
                        status: FetchConst.FETCH_IN_PROCESS,
                        error: null
                    }
                }
            };
        case location.SUCCESS:
            return {
                ...state,
                locations: action.payload,
                operations: {
                    fetchLocations: {
                        status: FetchConst.FETCH_SUCCESSFUL,
                        error: null
                    }
                }
            }
        case location.FAILURE:
            return {
                ...state,
                operations: {
                    fetchLocations: {
                        status: FetchConst.FETCH_FAILED,
                        error: action.payload
                    }
                }
            }
        default:
            return state;
    }
}

export default LocationReducer;