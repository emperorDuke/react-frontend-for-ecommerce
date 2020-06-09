import {
  filter,
  FilterActionTypes
} from "../../actionCreators/FilterActions/@types";
import { Reducer } from "redux";
import { FilterReducertype } from "./@types";
import { FetchConst } from "../../../service/Fetch/@types";

const initialState: FilterReducertype = {
  filters: {},
  operations: {
    fetchFilters: {
      status: null,
      error: null
    }
  }
};

const filterReducer: Reducer<FilterReducertype, FilterActionTypes> = (
  state = initialState,
  action: FilterActionTypes
) => {
  switch (action.type) {
    case filter.FILTER_REQUEST:
      return {
        ...state,
        operations: {
          fetchFilters: {
            status: FetchConst.FETCH_IN_PROCESS,
            error: null
          }
        }
      };
    case filter.FILTER_SUCCESS:
      return {
        ...state,
        filters: action.payload,
        operations: {
          fetchFilters: {
            status: FetchConst.FETCH_SUCCESSFUL,
            error: null
          }
        }
      };
    case filter.FILTER_FAILURE:
      return {
        ...state,
        operations: {
          fetchFilters: {
            status: FetchConst.FETCH_FAILED,
            error: action.payload
          }
        }
      };
    default:
      return state;
  }
};

export default filterReducer;
