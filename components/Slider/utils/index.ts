interface State {
  dummyIndex: number;
  position: number;
  shouldTransition: boolean;
  activeIndex: number;
}

interface PayloadOne {
  offset: number;
  nextIndex: number;
  isSlideEffect: boolean;
}

interface PayloadTwo {
  offset: number;
  nChildren: number;
}

type Action =
  | { type: "moveTo"; payload: State }
  | { type: "moveforward"; payload: PayloadOne }
  | { type: "movebackward"; payload: PayloadOne }
  | { type: "reflowToFirst"; payload: PayloadTwo }
  | { type: "reflowToLast"; payload: PayloadTwo };

interface PayloadArgument {
  effectType?: "fade" | "zoom-in" | "zoom-out" | "slide";
  state: State;
  nChildren: number;
  offset: number;
}

export function jumpforward(p: number, o: number, n: number = 0) {
  return n === 0 ? p + o : p + o * n;
}

export function jumpbackward(p: number, o: number, n: number = 0) {
  return n === 0 ? p + -o : p + -(o * n);
}

export function getNextPayload({
  nChildren,
  effectType,
  state,
  offset
}: PayloadArgument) {
  let activeIndex =
    state.activeIndex === nChildren - 1 ? 0 : state.activeIndex + 1;
  let shouldTransition = false;
  let dummyIndex = 0;
  let position = 0;

  if (effectType === "slide") {
    shouldTransition = true;
    dummyIndex = state.dummyIndex + 1;
    position = jumpbackward(state.position, offset);

    return {
      activeIndex,
      shouldTransition,
      dummyIndex,
      position
    };
  } else {
    position =
      state.activeIndex === nChildren - 1
        ? jumpforward(state.position, offset, nChildren - 1)
        : jumpbackward(state.position, offset);

    return {
      activeIndex,
      shouldTransition,
      dummyIndex,
      position
    };
  }
}

export function getPrevPayload({
  nChildren,
  effectType,
  state,
  offset
}: PayloadArgument) {
  let activeIndex =
    state.activeIndex === 0 ? nChildren - 1 : state.activeIndex - 1;
  let shouldTransition = false;
  let dummyIndex = 0;
  let position = 0;

  if (effectType === "slide") {
    shouldTransition = true;
    dummyIndex = state.dummyIndex - 1;
    position = jumpforward(state.position, offset);

    return {
      activeIndex,
      shouldTransition,
      dummyIndex,
      position
    };
  } else {
    position =
      state.activeIndex === 0
        ? jumpbackward(state.position, offset, nChildren - 1)
        : jumpforward(state.position, offset);

    return {
      activeIndex,
      shouldTransition,
      dummyIndex,
      position
    };
  }
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "moveTo":
      return {
        ...state,
        ...action.payload
      };
    case "moveforward":
      return {
        ...state,
        shouldTransition: action.payload.isSlideEffect ? true : false,
        activeIndex: action.payload.nextIndex,
        dummyIndex: action.payload.nextIndex + 1,
        position: jumpbackward(
          state.position,
          action.payload.offset,
          Math.abs(action.payload.nextIndex - state.activeIndex)
        )
      };
    case "movebackward":
      return {
        ...state,
        shouldTransition: action.payload.isSlideEffect ? true : false,
        activeIndex: action.payload.nextIndex,
        dummyIndex: action.payload.nextIndex + 1,
        position: jumpforward(
          state.position,
          action.payload.offset,
          Math.abs(action.payload.nextIndex - state.activeIndex)
        )
      };
    case "reflowToFirst":
      return {
        ...state,
        dummyIndex: 1,
        activeIndex: 0,
        shouldTransition: false,
        position: jumpforward(
          state.position,
          action.payload.offset,
          action.payload.nChildren
        )
      };

    case "reflowToLast":
      return {
        ...state,
        dummyIndex: action.payload.nChildren,
        activeIndex: action.payload.nChildren - 1,
        shouldTransition: false,
        position: jumpbackward(
          state.position,
          action.payload.offset,
          action.payload.nChildren
        )
      };
    default:
      return state;
  }
}
