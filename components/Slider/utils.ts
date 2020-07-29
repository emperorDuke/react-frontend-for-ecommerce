import { PayloadArgument, State, UpdateSize, Action } from "./types";


export function jumpforward(
  position: number,
  offset: number,
  nTime: number = 0
) {
  return nTime === 0 ? position + offset : position + offset * nTime;
}

export function jumpbackward(
  position: number,
  offset: number,
  nTime: number = 0
) {
  return nTime === 0 ? position + -offset : position + -(offset * nTime);
}

export function getNextPayload({
  nChildren,
  effectType,
  state,
}: PayloadArgument) {
  let activeIndex =
    state.activeIndex === nChildren - 1 ? 0 : state.activeIndex + 1;
  let transition = false;
  let dummyIndex = 0;
  let position = 0;
  const width = state.width;
  const height = state.height;

  if (effectType === "slide") {
    transition = true;
    dummyIndex = state.dummyIndex + 1;
    position = jumpbackward(state.position, width);

    return {
      activeIndex,
      transition,
      dummyIndex,
      position,
      height,
      width,
    };
  } else {
    position =
      state.activeIndex === nChildren - 1
        ? jumpforward(state.position, width, nChildren - 1)
        : jumpbackward(state.position, width);

    return {
      activeIndex,
      transition,
      dummyIndex,
      position,
      height,
      width,
    };
  }
}

export function getPrevPayload({
  nChildren,
  effectType,
  state,
}: PayloadArgument) {
  let activeIndex =
    state.activeIndex === 0 ? nChildren - 1 : state.activeIndex - 1;
  let transition = false;
  let dummyIndex = 0;
  let position = 0;
  const width = state.width;
  const height = state.height;

  if (effectType === "slide") {
    transition = true;
    dummyIndex = state.dummyIndex - 1;
    position = jumpforward(state.position, width);

    return {
      activeIndex,
      transition,
      dummyIndex,
      position,
      height: state.height,
      width: state.width,
    };
  } else {
    position =
      state.activeIndex === 0
        ? jumpbackward(state.position, width, nChildren - 1)
        : jumpforward(state.position, width);

    return {
      activeIndex,
      transition,
      dummyIndex,
      position,
      height,
      width,
    };
  }
}

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
    position = jumpbackward(0, payload.width, state.activeIndex);
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