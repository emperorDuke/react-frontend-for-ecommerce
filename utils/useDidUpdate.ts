import React from "react";

/**
 * hook will run after every re-render except for the initial render
 * @param callback effect callback
 * @param deps effect dependencies
 */
export const useDidUpdate = (callback: () => any, deps?: readonly any[]) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) callback();
    else didMount.current = true;
  }, deps);
};
