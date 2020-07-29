import React, { forwardRef } from "react";
import useStyles from "./styles";
import clsx from "classnames";
import { SlideProps } from "./@types";

const Slide = forwardRef<HTMLDivElement, SlideProps>((props, ref) => {
  const classes = useStyles();

  const captionEl = (
    <div className={classes.captionWrapper}>
      <p className={classes.caption}>{props.caption}</p>
    </div>
  );

  const handleClick = (event?: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClick && event) props.onClick(event);

    if (props.__setIndex && typeof props.__index === "number") {
      props.__setIndex(props.__index);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(classes.base, props.className)}
      ref={ref}
      aria-label={`slide-${props.__index}`}
      role="button"
    >
      {props.__showCaption && props.caption && captionEl}
      {React.isValidElement(props.children) &&
        React.cloneElement(props.children, {
          className: clsx(classes.base, props.children.props.className),
        })}
    </div>
  );
});

Slide.defaultProps = {
  __showCaption: true,
};

export default Slide;
