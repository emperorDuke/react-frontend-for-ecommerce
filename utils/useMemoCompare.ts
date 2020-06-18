import React from "react";

export function shallowCompare<T>(previous: T, current: T): boolean {
  let isEqual = true;

  for (let key in current) {
    let isSame = current[key] === previous[key];
    if (!isSame) isEqual = false;
  }

  return isEqual;
}

/**
 * returns a memoized version of the value that only changes if different
 * @param current current value
 * @param equityFn equity function
 */
export function useMemoCompare<T>(current: T, equityFn = shallowCompare) {
  const previousRef = React.useRef(current);

  const previousObj = previousRef.current;
  const isEqual = equityFn(previousObj, current);

  React.useEffect(() => {
    if (!isEqual) {
      previousRef.current = current;
    }
  });

  return isEqual ? previousObj : current;
}
