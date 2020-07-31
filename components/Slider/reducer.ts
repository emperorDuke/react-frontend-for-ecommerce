import { State, UpdateSize, Action } from "./@types";
import { jumpbackward, jumpforward } from "./utils";

const getPosition = (state: State, payload: UpdateSize) => {
  let position = 0;
  let startPosition = 0 - payload.width;

  if (payload.effectType === "slide") {
    if (state.activeIndex === 0) {
      position = startPosition;
    } else {
      position = jumpbackward(startPosition, payload.width, state.activeIndex);
    }
  } else {
    if (state.activeIndex === 0) {
      position = 0;
    } else {
      position = jumpbackward(0, payload.width, state.activeIndex);
    }
  }

  return position;
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "moveTo":
      return {
        ...state,
        ...action.payload,
      };
    case "moveforward":
      return {
        ...state,
        transition: action.payload.isSlideEffect ? true : false,
        activeIndex: action.payload.nextIndex,
        dummyIndex: action.payload.nextIndex + 1,
        position: jumpbackward(
          state.position,
          state.width,
          Math.abs(action.payload.nextIndex - state.activeIndex)
        ),
      };
    case "movebackward":
      return {
        ...state,
        transition: action.payload.isSlideEffect ? true : false,
        activeIndex: action.payload.nextIndex,
        dummyIndex: action.payload.nextIndex + 1,
        position: jumpforward(
          state.position,
          state.width,
          Math.abs(action.payload.nextIndex - state.activeIndex)
        ),
      };
    case "reflowToFirst":
      return {
        ...state,
        dummyIndex: 1,
        activeIndex: 0,
        transition: false,
        position: jumpforward(
          state.position,
          state.width,
          action.payload.nChildren
        ),
      };

    case "reflowToLast":
      return {
        ...state,
        dummyIndex: action.payload.nChildren,
        activeIndex: action.payload.nChildren - 1,
        transition: false,
        position: jumpbackward(
          state.position,
          state.width,
          action.payload.nChildren
        ),
      };
    case "updateSize":
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        transition: false,
        position: getPosition(state, action.payload),
      };
    default:
      return state;
  }
}
