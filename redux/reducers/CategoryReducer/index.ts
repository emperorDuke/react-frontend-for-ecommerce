import { CategoryActionTypes, category, CategoryTypes  } from "../../actionCreators/CategoryActions/@types";
import { FetchOperationType, FetchConst } from '../../../service/Fetch/@types'


type CategoryReducertype = {
    categories: Array<CategoryTypes>;
    operations:{
        [opName:string]: FetchOperationType
    }
}

const initialState:CategoryReducertype = {
    categories: [],
    operations:{
        fetchCategories:{
            status: null,
            error: null
        }
    }
}


export default function CategoryReducer (state=initialState, action:CategoryActionTypes):CategoryReducertype {
    switch (action.type) {
        case category.REQUEST:
            return {
                ...state,
                operations: {
                    fetchCategories: {
                        status: FetchConst.FETCH_IN_PROCESS,
                        error: null
                    }
                }
            };
        case category.SUCCESS:
            return {
                ...state,
                categories: action.payload,
                operations: {
                    fetchCategories: {
                        status: FetchConst.FETCH_SUCCESSFUL,
                        error: null
                    }
                }
            }
        case category.FAILURE:
            return {
                ...state,
                operations: {
                    fetchCategories: {
                        status: FetchConst.FETCH_FAILED,
                        error: action.payload
                    }
                }
            }
        default:
            return state;
    }
}