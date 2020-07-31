import React, { useEffect, useRef, useReducer, Children, useMemo } from "react";
import { useSwipeable, EventData } from "react-swipeable";
import ArrowLeftIcon from "@material-ui/icons/ArrowBack";
import ArrowRightIcon from "@material-ui/icons/ArrowForward";
import ButtonBase from "@material-ui/core/ButtonBase";
import clsx from "classnames";
import useStyles from "./styles";
import Thumbnail from "./thumbnails/Thumbnail";
import Indicators from "./indicators/Indicator";
import { getNextPayload, getPrevPayload } from "./utils";
import Animator from "./animator/Animator";
import { fromEvent } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { SliderProps } from "./@types";
import { reducer } from "./reducer";

const Slider: React.ComponentType<SliderProps> = (props) => {
  const SECONDS = 1000;
  const CLONE = 2;
  const initHeight = Number(props.height) || 0;
  const initWidth = Number(props.width) || 0;
  const noOfVisibleThumbs = props.noOfVisibleThumbs || 4;
  const isThumbnail = props.type === "thumbnails";
  const isSlideEffect = props.effectType === "slide";
  const infinite = !!props.infinite;

  const [state, dispatch] = useReducer(reducer, {
    dummyIndex: 1,
    position: 0,
    transition: true,
    activeIndex: 0,
    width: initWidth,
    height: initHeight,
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
    const insertNewKey = (el: any, i: number) => {
      if (el && React.isValidElement(el)) {
        return React.cloneElement(el, {
          key: `clone_${i}`,
        });
      }
      return el;
    };

    if (isSlideEffect) {
      const cloneChildren = Children.toArray(props.children);
      const firstIndex = 0;
      const lastIndex = cloneChildren.length - 1;
      const childrenArrayCopy = cloneChildren.slice();

      childrenArrayCopy.push(
        insertNewKey(cloneChildren[firstIndex], firstIndex)
      );

      childrenArrayCopy.unshift(
        insertNewKey(cloneChildren[lastIndex], lastIndex)
      );
      return childrenArrayCopy;
    }
  }, [props.children]);

  const thumbnailDimension = useMemo(() => {
    const width = state.width / noOfVisibleThumbs;

    let height = 0;

    if (props.thumbHeightFactor && !isThumbnail) {
      height = state.height / props.thumbHeightFactor;
    } else if (isThumbnail) {
      height = state.height;
    }

    return { width, height };
  }, [state.width, state.height]);

  const dotDimension = useMemo(() => {
    const width = state.width / 50;
    const height = state.height / 50;

    return { width, height };
  }, [state.width, state.height]);

  const slideRef = useRef<HTMLDivElement>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const countDownRef = useRef(count);

  const classes = useStyles({
    ...state,
    thumbHeight: thumbnailDimension.height,
  });

  const handlers = useSwipeable({
    onSwipedLeft: (event?: EventData) => {
      effect(next)();
    },
    onSwipedRight: (event?: EventData) => {
      effect(previous)();
    },
    trackMouse: true,
    trackTouch: true,
  });

  useEffect(() => {
    const dimension = getDimension();

    const getPosition = () => {
      if (isSlideEffect && !isThumbnail) {
        return 0 - dimension.width;
      } else {
        return state.position;
      }
    };

    dispatch({
      type: "moveTo",
      payload: {
        ...state,
        position: getPosition(),
        height: dimension.height,
        width: dimension.width,
      },
    });

    const event = fromEvent(window, "resize")
      .pipe(debounceTime(250), map(getDimension))
      .subscribe((val) => {
        dispatch({
          type: "updateSize",
          payload: {
            ...val,
            effectType: props.effectType,
          },
        });
      });

    return event.unsubscribe;
  }, []);

  useEffect(() => {
    if (props.autoplay) {
      resetCount();

      return destroyTimer;
    }
  }, [state.activeIndex, state.position]);

  useEffect(() => {
    if (isSlideEffect && infinite) {
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

  const getDimension = () => {
    let width = 0;
    let height = 0;
    if (sliderRef.current && sliderRef.current.parentElement) {
      width = sliderRef.current.parentElement.clientWidth;
      height = sliderRef.current.clientHeight;
    }
    return { width, height };
  };

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

    const effectType = props.effectType;

    dispatch({
      type: "moveTo",
      payload: getNextPayload({ nChildren, effectType, state, infinite }),
    });
  };

  const previous = () => {
    if (isSlideEffect && state.dummyIndex === 0) return;

    const effectType = props.effectType;

    dispatch({
      type: "moveTo",
      payload: getPrevPayload({ nChildren, effectType, state, infinite }),
    });
  };

  const effect = (callback: () => void) => {
    refreshTimer();
    return callback;
  };

  const goToIndex = (nextIndex: number) => {
    const payload = { nextIndex, isSlideEffect };

    refreshTimer();

    if (nextIndex === state.activeIndex) {
      return;
    } else if (nextIndex > state.activeIndex) {
      dispatch({
        type: "moveforward",
        payload,
      });
    } else {
      dispatch({
        type: "movebackward",
        payload,
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
    const isFirstClone = state.dummyIndex === 0;
    const isLastClone = state.dummyIndex === nChildren + CLONE - 1;
    const payload = { nChildren };

    if (isFirstClone) {
      dispatch({
        type: "reflowToLast",
        payload,
      });
    } else if (isLastClone) {
      dispatch({
        type: "reflowToFirst",
        payload,
      });
    }
  };

  const handleOnMouseEnter = () => {
    if (props.autoplay) return pause();
  };

  const handleOnMouseLeave = () => {
    if (props.autoplay) return play();
  };

  const renderItem = () => {
    if (!isSlideEffect) {
      return Children.map(props.children, (child, i) => (
        <Animator key={i} activeIndex={state.activeIndex}>
          {React.isValidElement(child) &&
            React.cloneElement(child, {
              className: clsx(child.props.className, classes.slideWrapper),
            })}
        </Animator>
      ));
    } else {
      return (
        childrenWithClone &&
        childrenWithClone.map(
          (child) =>
            React.isValidElement(child) &&
            React.cloneElement(child, {
              className: clsx(child.props.className, classes.slideWrapper),
              ref: slideRef,
            })
        )
      );
    }
  };

  const hideRightBtn = {
    [classes.disabledButton]: !infinite && state.activeIndex === nChildren - 1,
  };

  const hideLeftBtn = {
    [classes.disabledButton]: !infinite && state.activeIndex === 0,
  };

  const attributes = {
    ...handlers,
    onMouseEnter: handleOnMouseEnter,
    onMouseLeave: handleOnMouseLeave,
    className: classes.slider,
    "aria-label": "slide-wrapper",
  };

  return (
    <React.Fragment>
      {props.children && (
        <div
          className={clsx(classes.container, props.className)}
          aria-label="slider"
          ref={sliderRef}
        >
          {!isThumbnail && (
            <div {...attributes}>
              {renderItem()}
              {!props.disableButtons && (
                <ButtonBase
                  onClick={effect(previous)}
                  className={clsx(classes.btn, classes.leftBtn, hideLeftBtn)}
                >
                  <ArrowLeftIcon />
                </ButtonBase>
              )}

              {!props.disableButtons && (
                <ButtonBase
                  onClick={effect(next)}
                  className={clsx(classes.btn, classes.rightBtn, hideRightBtn)}
                >
                  <ArrowRightIcon />
                </ButtonBase>
              )}

              {/** dot indicator */}
              {!props.disableIndicator && (
                <Indicators
                  children={props.children}
                  setIndex={goToIndex}
                  activeIndex={state.activeIndex}
                  dotDimension={dotDimension}
                />
              )}
            </div>
          )}

          {/** thumbs  */}
          {(isThumbnail || props.showThumbs) && (
            <Thumbnail
              children={props.children}
              setIndex={goToIndex}
              activeIndex={state.activeIndex}
              thumbDimension={thumbnailDimension}
              noOfVisibleThumbs={noOfVisibleThumbs}
            />
          )}
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
  noOfVisibleThumbs: 4,
  thumbHeightFactor: 6,
  type: "carousel",
  showThumbs: false,
  effectType: "slide",
  height: 300,
  width: 600,
  infinite: false,
};

export default Slider;
