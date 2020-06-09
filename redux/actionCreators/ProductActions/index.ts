import * as T from "./@types";


export function productRequest (payload:string):T.ProductRequest {
    return {
        type: T.product.PRODUCT_REQUEST,
        payload
    }
}

export function productSuccess (payload: Array<T.ProductType>): T.ProductSuccess {
    return {
        type: T.product.PRODUCT_SUCCESS,
        payload: payload
    }
}

export function productFailure (payload: string):T.ProductFailure {
    return {
        type: T.product.PRODUCT_ERROR,
        payload: payload
    }
}


export * from "./@types";









