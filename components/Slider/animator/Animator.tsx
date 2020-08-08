import React, { useState, useEffect, useRef } from "react";
import clsx from "classnames";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import useForkRef from "@material-ui/core/utils/useForkRef";

interface AnimatorProps {
  children: React.ReactNode;
  activeIndex: number;
}

const useStyles = makeStyles(() =>
  createStyles({
    default: {
      opacity: 0,
    },
    highOpacity: {
      opacity: 1,
      transition: "opacity 400ms ease-in-out 30ms",
    },
    lowOpacity: {
      opacity: 0.5,
      transition: "opacity 200ms ease-in",
    },
  })
);

const Animator = React.forwardRef<HTMLDivElement, AnimatorProps>(
  (props, ref) => {
    const [push, setPush] = useState(false);
    const classes = useStyles();
    const slideRef = useRef<HTMLDivElement>(null);
    const handleRef = useForkRef(ref, slideRef);

    useEffect(() => {
      const onTransitionEnd = () => {
        if (slideRef.current) {
          slideRef.current.addEventListener(
            "transitionend",
            handleTransitionEnd
          );
        }
      };

      onTransitionEnd();

      const destroyTransitionEnd = () => {
        if (slideRef.current) {
          slideRef.current.removeEventListener(
            "transitionend",
            handleTransitionEnd
          );
        }
      };

      return destroyTransitionEnd;
    }, []);

    useEffect(() => setPush(true), [props.activeIndex]);

    const handleTransitionEnd = () => setPush(false);

    return (
      <React.Fragment>
        {React.isValidElement(props.children) &&
          React.cloneElement(props.children, {
            ref: handleRef,
            className: clsx(props.children.props.className, classes.default, {
              [classes.lowOpacity]: push,
              [classes.highOpacity]: !push,
            }),
          })}
      </React.Fragment>
    );
  }
);

export default Animator;
