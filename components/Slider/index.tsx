import React, { useEffect, useRef, useReducer, Children, useMemo } from "react";
import ArrowLeftIcon from "@material-ui/icons/ArrowBack";
import ArrowRightIcon from "@material-ui/icons/ArrowForward";
import ButtonBase from "@material-ui/core/ButtonBase";
import clsx from "classnames";
import useStyles from "./styles";
import Thumbnails, { ThumbnailsProps } from "./Thumbnails";
import Indicators from "./Indicators";
import { reducer, getNextPayload, getPrevPayload } from "./utils";
import Animator from "./Animator";

interface SliderProps
  extends Pick<ThumbnailsProps, "noThumbsPerView" | "heightFactor"> {
  children?: React.ReactNodeArray;
  className?: string;
  interval?: number;
  showThumbs?: boolean;
  disableIndicator?: boolean;
  disableButtons?: boolean;
  autoplay?: boolean;
  height?: number;
  width?: number;
  type?: "carousel" | "thumbnails";
  effectType?: "fade" | "zoom-in" | "zoom-out" | "slide";
}

function Slider(props: SliderProps) {
  const SECONDS = 1000;

  const CLONE = 2;

  const width = props.width ?? 0;

  const height = props.height ?? 0;

  const isThumbnails = props.type === "thumbnails";

  const isSlideEffect = props.effectType === "slide";

  const [state, dispatch] = useReducer(reducer, {
    dummyIndex: 1,
    position: 0,
    shouldTransition: true,
    activeIndex: 0
  });

  const count = useMemo(() => {
    if (props.interval) {
      return Math.floor(props.interval / SECONDS);
    }
    return 5;
  }, [props.interval]);

  const nChildren = useMemo(() => {
    if (props.children) {
      return Children.count(props.children);
    }
    return 0;
  }, [props.children]);

  const childrenWithClone = useMemo(() => {
    if (isSlideEffect) {
      const cloneChildren = Children.toArray(props.children);
      const childrenArrayCopy = cloneChildren.slice();
      childrenArrayCopy.push(cloneChildren[0]);
      childrenArrayCopy.unshift(cloneChildren[cloneChildren.length - 1]);
      return childrenArrayCopy;
    }
  }, [props.children]);

  const sliderDimensionRef = useRef({ width: width, height: height });

  const sliderRef = useRef<HTMLDivElement>(null);

  const slideRef = useRef<HTMLDivElement>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const countDownRef = useRef(count);

  const classes = useStyles({
    ...sliderDimensionRef.current,
    ...state,
    isThumbnails
  });

  useEffect(() => {
    const setDimension = () => {
      if (sliderRef.current) {
        sliderDimensionRef.current = {
          width: isThumbnails ? width : sliderRef.current.clientWidth,
          height: isThumbnails ? height : sliderRef.current.clientHeight
        };
      }
    };

    setDimension();

    window.addEventListener("resize", setDimension);

    if (isSlideEffect) {
      dispatch({
        type: "moveTo",
        payload: {
          ...state,
          position: 0 - sliderDimensionRef.current.width
        }
      });
    }

    return () => window.removeEventListener("resize", setDimension);
  }, []);

  useEffect(() => {
    if (props.autoplay) {
      resetCount();

      return destroyTimer;
    }
  }, [state.activeIndex, state.position]);

  useEffect(() => {
    if (isSlideEffect) {
      const onTransitionEnd = () => {
        if (slideRef.current) {
          slideRef.current.addEventListener(
            "transitionend",
            handleTransitionEnd
          );
        }
      };

      const destroyTransitionEnd = () => {
        if (slideRef.current) {
          slideRef.current.removeEventListener(
            "transitionend",
            handleTransitionEnd
          );
        }
      };

      onTransitionEnd();

      return destroyTransitionEnd;
    }
  }, [state.activeIndex, state.position]);

  const countDownSeconds = () => {
    if (countDownRef.current === 0) {
      next();
    } else {
      countDownRef.current -= 1;
    }
  };

  const destroyTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const setCountDown = () => {
    destroyTimer();
    timerRef.current = setInterval(countDownSeconds, SECONDS);
  };

  const resetCount = () => {
    countDownRef.current = count;
    setCountDown();
  };

  const refreshTimer = props.autoplay ? resetCount : () => null;

  const next = () => {
    if (isSlideEffect && state.dummyIndex === nChildren + CLONE - 1) return;

    const offset = sliderDimensionRef.current.width;
    const effectType = props.effectType;

    dispatch({
      type: "moveTo",
      payload: getNextPayload({ nChildren, effectType, state, offset })
    });
  };

  const previous = () => {
    if (isSlideEffect && state.dummyIndex === 0) return;

    const offset = sliderDimensionRef.current.width;
    const effectType = props.effectType;

    dispatch({
      type: "moveTo",
      payload: getPrevPayload({ nChildren, effectType, state, offset })
    });
  };

  const effect = (callback: () => void) => () => {
    refreshTimer();
    callback();
  };

  const goToIndex = (nextIndex: number) => {
    const offset = sliderDimensionRef.current.width;
    const payload = { offset, nextIndex, isSlideEffect };

    refreshTimer();

    if (nextIndex === state.activeIndex) {
      return;
    } else if (nextIndex > state.activeIndex) {
      dispatch({
        type: "moveforward",
        payload
      });
    } else {
      dispatch({
        type: "movebackward",
        payload
      });
    }
  };

  const pause = () => {
    destroyTimer();
  };

  const play = () => {
    setCountDown();
  };

  const handleTransitionEnd = () => {
    const offset = sliderDimensionRef.current.width;
    const isFirstClone = state.dummyIndex === 0;
    const isLastClone = state.dummyIndex === nChildren + CLONE - 1;
    const payload = { nChildren, offset };

    if (isFirstClone) {
      dispatch({
        type: "reflowToLast",
        payload
      });
    } else if (isLastClone) {
      dispatch({
        type: "reflowToFirst",
        payload
      });
    }
  };

  const renderItem = () => {
    if (!isSlideEffect) {
      return Children.map(props.children, (child, i) => (
        <Animator key={i} activeIndex={state.activeIndex}>
          {React.isValidElement(child) &&
            React.cloneElement(child, {
              className: clsx(child.props.className, classes.slideWrapper)
            })}
        </Animator>
      ));
    } else {
      return childrenWithClone && childrenWithClone.map(
        child =>
          React.isValidElement(child) &&
          React.cloneElement(child, {
            className: clsx(child.props.className, classes.slideWrapper),
            ref: slideRef
          })
      );
    }
  };

  const attributes = {
    onMouseEnter: props.autoplay ? pause : undefined,
    onMouseLeave: props.autoplay ? play : undefined,
    className: classes.container,
    "aria-label": "slider"
  };

  return (
    <React.Fragment>
      {props.children && (
        <div {...attributes}>
          <div
            ref={sliderRef}
            className={clsx(classes.slider, props.className)}
            aria-label="slide-wrapper"
          >
            {!isThumbnails && renderItem()}

            {!props.disableButtons && !isThumbnails && (
              <ButtonBase
                onClick={effect(previous)}
                className={clsx(classes.btn, classes.leftBtn)}
              >
                <ArrowLeftIcon />
              </ButtonBase>
            )}

            {!props.disableButtons && !isThumbnails && (
              <ButtonBase
                onClick={effect(next)}
                className={clsx(classes.btn, classes.rightBtn)}
              >
                <ArrowRightIcon />
              </ButtonBase>
            )}

            {/** dot indicator */}
            {!props.disableIndicator && !isThumbnails && (
              <Indicators
                children={props.children}
                setIndex={goToIndex}
                activeIndex={state.activeIndex}
                sliderDimension={sliderDimensionRef.current}
              />
            )}
          </div>

          {/** thumbs  */}
          {isThumbnails || props.showThumbs ? (
            <Thumbnails
              children={props.children}
              setIndex={goToIndex}
              activeIndex={state.activeIndex}
              sliderDimension={sliderDimensionRef.current}
              noThumbsPerView={props.noThumbsPerView}
              heightFactor={props.heightFactor}
              standalone={isThumbnails}
            />
          ) : null}
        </div>
      )}
    </React.Fragment>
  );
}

Slider.defaultProps = {
  interval: 5000,
  disableButtons: false,
  disableIndicator: false,
  autoplay: false,
  noThumbsPerView: 4,
  heightFactor: 6,
  type: "carousel",
  showThumbs: false,
  effectType: "slide",
  width: 0,
  height: 0
};

export default Slider;
