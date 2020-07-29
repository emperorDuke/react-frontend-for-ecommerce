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
  const childrenOverflowed = state.nChildren > payload.nCards;
  const isLastIndex = state.activeIndex === state.nChildren;
  const transition = false;
  const cardWidth = payload.width / payload.nCards;

  if (childrenOverflowed) {
    let activeIndex = 0;
    let position = 0;

    if (isLastIndex) {
      activeIndex = state.activeIndex;
      const slots = activeIndex - payload.nCards;
      position = JB(0, cardWidth, slots);
    } else {
      const otherSlots = state.numberOfCards - 1;
      const firstIndex = state.activeIndex - otherSlots;
      activeIndex = firstIndex + payload.nCards - 1;
      
      if (activeIndex >= state.nChildren) {
        const extra = activeIndex - state.nChildren;
        const slots = activeIndex - payload.nCards - extra;
        position = JB(0, cardWidth, slots);
        activeIndex = activeIndex - extra;
      } else {
        position = firstIndex <= 1 ? 0 : JB(0, cardWidth, firstIndex);
      }
    }
    return {
      activeIndex,
      position,
      transition,
    };
  }

  return;
};

export function reducer(state: State, action: Action) {
  const cardWidth = state.parentElWidth / state.numberOfCards;

  switch (action.type) {
    case "moveforward":
      return {
        ...state,
        position:
          state.activeIndex === state.nChildren
            ? state.position
            : state.position + -cardWidth,
        activeIndex:
          state.activeIndex === state.nChildren
            ? state.activeIndex
            : state.activeIndex + 1,
        transition: true,
      };
    case "movebackward":
      return {
        ...state,
        position:
          state.activeIndex === state.numberOfCards
            ? 0
            : state.position + cardWidth,
        activeIndex:
          state.activeIndex === state.numberOfCards
            ? state.numberOfCards
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
        parentElWidth: action.payload.width,
        numberOfCards: action.payload.nCards,
        ...onResize(state, action.payload),
      };
    default:
      return state;
  }
}
