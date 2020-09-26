import React from "react";

export function shallowCompare<T>(previous: T, current: T): boolean {
  let isEqual = true;

  for (let key in current) {
    if (current[key] !== previous[key]) {
      isEqual = false;
      break
    }
  }

  return isEqual;
}

/**
 * Returns a memoized version of the value that only changes if different
 * @param current current value
 * @param equityFn equity function
 */
export function useMemoCompare<T>(current: T, equityFn = shallowCompare) {
  const previousRef = React.useRef(current);
  
  const isEqual = equityFn(previousRef.current, current);

  React.useEffect(() => {
    if (!isEqual) {
      previousRef.current = current;
    }
  });

  return isEqual ? previousRef.current : current;
}
