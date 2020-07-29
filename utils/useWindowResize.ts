import React from "react";
import { fromEvent } from "rxjs";
import { debounceTime, mapTo } from "rxjs/operators";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
const getHeight = () =>
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

const getDimensions = () =>
  typeof window !== "undefined"
    ? {
        width: getWidth(),
        height: getHeight(),
      }
    : {
        width: 0,
        height: 0
    };

export function useWindowResize() {
  const [dimension, setDimension] = React.useState(getDimensions());

  React.useEffect(() => {
    const event = fromEvent(window, "resize")
      .pipe(debounceTime(500), mapTo(getDimensions()))
      .subscribe(setDimension);

    return () => event.unsubscribe();
  });

  return dimension;
}
