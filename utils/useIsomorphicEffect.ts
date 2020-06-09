import React from "react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
    ? React.useLayoutEffect
    : React.useEffect;
