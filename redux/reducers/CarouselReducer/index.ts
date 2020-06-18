import {
  CarouselType,
  carousel,
  CarouselActionTypes
} from "../../actionCreators/CarouselActions/@types";
import { FetchOperationType, FetchConst } from "../../../utils/Fetch/@types";

export type CarouselReducerState = {
  carousels: Array<CarouselType>;
  operations: {
    [opName: string]: FetchOperationType;
  };
};

const initialState: CarouselReducerState = {
  carousels: [],
  operations: {
    fetchCarousels: {
      status: null,
      error: null
    }
  }
};

export default function CarouselReducer(
  state = initialState,
  action: CarouselActionTypes
) {
  switch (action.type) {
    case carousel.CAROUSEL_REQUEST:
      return {
        ...state,
        operations: {
          fetchCarousels: {
            status: FetchConst.FETCH_IN_PROCESS,
            error: null
          }
        }
      };
    case carousel.CAROUSEL_SUCCESS:
      return {
        ...state,
        carousels: action.payload,
        operations: {
          fetchCarousels: {
            status: FetchConst.FETCH_SUCCESSFUL,
            error: null
          }
        }
      };
    case carousel.CAROUSEL_ERROR:
      return {
        ...state,
        operations: {
          fetchCarousels: {
            status: FetchConst.FETCH_FAILED,
            error: action.payload
          }
        }
      };
    default:
      return state;
  }
}
