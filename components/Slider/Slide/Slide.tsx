import React, { forwardRef } from "react";
import useStyles from "./styles";
import clsx from "classnames";
import { SlideProps } from "./@types";

const Slide = forwardRef<HTMLDivElement, SlideProps>((props, ref) => {
  const thumbnailComponent = props.__parent === "thumbnailComponent";

  const classes = useStyles();

  const captionEl = (
    <div className={classes.captionWrapper}>
      <p className={classes.caption}>{props.caption}</p>
    </div>
  );

  const handleClick = (event?: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClick && event && !thumbnailComponent) {
      props.onClick(event);
    }

    if (props.__setIndex && typeof props.__index === "number") {
      props.__setIndex(props.__index);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(classes.slide, props.className)}
      style={props.style}
      ref={ref}
      aria-label={`slide-${props.__index}`}
      role="button"
      tabIndex={0}
    >
      {thumbnailComponent && props.caption && captionEl}
      {props.children}
    </div>
  );
});

Slide.defaultProps = {
  __parent: "sliderComponent",
};

export default Slide;
