import React from "react";

/**
 * it will run after every re-render except for the initial render
 * @param effect effect callback
 * @param deps effect dependencies
 */
export const useDidUpdate = (
  effect: React.EffectCallback,
  deps?: React.DependencyList
) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) effect();
    else didMount.current = true;
  }, deps);
};
