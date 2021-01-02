import { jumpbackward as JB } from "../Slider/utils";
import { State, OnResizePayload, Action} from "./@types";

export const SIZES = {
  xl: { sm: 7, md: 6, lg: 5 },
  lg: { sm: 6, md: 5, lg: 4 },
  md: { sm: 5, md: 4, lg: 3 },
  sm: { sm: 4, md: 3, lg: 2 },
  xs: { sm: 3, md: 2, lg: 1 },
};

const onResize = (state: State, payload: OnResizePayload) => {
  
  const nTime = state.activeIndex - payload.numberOfCards;
  const position = 0 - payload.cardWidth * nTime;

  return {
    position,
    transition: false,
    parentElWidth: payload.parentElWidth
  }
};

export function reducer(state: State, action: Action) {

  switch (action.type) {
    case "moveforward":
      return {
        ...state,
        position:
          state.activeIndex === action.payload.nChildren
            ? state.position
            : state.position + -action.payload.cardWidth,
        activeIndex:
          state.activeIndex === action.payload.nChildren
            ? state.activeIndex
            : state.activeIndex + 1,
        transition: true,
      };
    case "movebackward":
      return {
        ...state,
        position:
          state.activeIndex === action.payload.numberOfCards
            ? 0
            : state.position + action.payload.cardWidth,
        activeIndex:
          state.activeIndex === action.payload.numberOfCards
            ? action.payload.numberOfCards
            : state.activeIndex - 1,
        transition: true,
      };
    case "update":
      return {
        ...state,
        ...action.payload,
      };
    case "onResize":
      return {
        ...state,
        ...onResize(state, action.payload),
      };
    default:
      return state;
  }
}
