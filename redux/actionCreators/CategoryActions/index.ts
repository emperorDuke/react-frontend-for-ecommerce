
import { 
    CategoryRequestTypes, 
    CategorySuccessTypes, 
    CategoryFailureTypes, 
    category, 
    CategoryTypes,
 } from "./@types";



export function categoryRequest (payload: string): CategoryRequestTypes {
    return {
        type: category.REQUEST,
        payload
    }
}

export function categorySuccess(payload:Array<CategoryTypes>): CategorySuccessTypes {
    return {
        type: category.SUCCESS,
        payload: payload
    }
}

export function categoryFailure (payload:string): CategoryFailureTypes {
    return {
        type: category.FAILURE,
        payload: payload
    }
}


export * from './@types';








