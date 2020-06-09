import React, { useState, useEffect, Children } from "react";
import useStyles from "./styles";
import clsx from "classnames";
import ButtonBase from "@material-ui/core/ButtonBase";
import { IndicatorProps } from "./@types";

const Indicators: React.ComponentType<IndicatorProps> = props => {
  const [idx, setIdx] = useState(props.activeIndex);
  const classes = useStyles({ ...props.sliderDimension });

  useEffect(() => setIdx(props.activeIndex), [props.activeIndex]);

  return (
    <div className={classes.indicatorWrapper} aria-label="dots-wrapper">
      <div
        className={classes.dotsWrapper}
        role="button"
        aria-label="dots-wrapper"
      >
        {Children.map(props.children, (c, i) => (
          <ButtonBase
            key={i}
            onClick={() => props.setIndex(i)}
            aria-label="dot"
            className={clsx(classes.dot, {
              [classes.activeDot]: idx === i,
              [classes.notActiveDot]: idx !== i
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default Indicators;
