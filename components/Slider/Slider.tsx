import React, { useEffect, useRef, useReducer, Children, useMemo } from "react";
import { useSwipeable, EventData } from "react-swipeable";
import ArrowLeftIcon from "@material-ui/icons/ArrowBack";
import ArrowRightIcon from "@material-ui/icons/ArrowForward";
import Fade from "@material-ui/core/Fade";
import ButtonBase from "@material-ui/core/ButtonBase";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "classnames";
import useStyles from "./styles";
import Thumbnail from "./thumbnails/Thumbnail";
import Indicators from "./indicators/Indicator";
import { getNextPayload, getPrevPayload } from "./utils";
import { fromEvent } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { SliderProps } from "./@types";
import { reducer } from "./reducer";
import { SlideProps } from "./Slide/@types";

const Slider: React.ComponentType<SliderProps> = (props) => {
  const SECONDS = 1000;
  const CLONE = 2;
  const initHeight = Number(props.height) || 0;
  const initWidth = Number(props.width) || 0;
  const noOfVisibleThumbs = props.noOfVisibleThumbs || 4;
  const isThumbnailType = props.type === "thumbnails";
  const infinite = !!props.infinite;
  const focuserVisible = !isThumbnailType || !!props.focuserVisible;
  const isManual = !infinite && !props.autoplay;
  const pauseOnMouseEnter = props.autoplay && !!props.pauseOnMouseEnter;

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
      if (React.isValidElement<SlideProps>(el)) {
        return React.cloneElement(el, {
          key: `clone_${i}`,
        });
      }
      return el;
    };

    const children = Children.map(props.children, (child, i) =>
      React.isValidElement<SlideProps>(child)
        ? React.cloneElement(child, {
            __index: i,
          })
        : child
    );

    const cloneChildren = Children.toArray(children);
    const firstIndex = 0;
    const lastIndex = cloneChildren.length - 1;
    const childrenArrayCopy = cloneChildren.slice();

    childrenArrayCopy.push(insertNewKey(cloneChildren[firstIndex], firstIndex));

    childrenArrayCopy.unshift(
      insertNewKey(cloneChildren[lastIndex], lastIndex)
    );
    return childrenArrayCopy;
  }, [props.children]);

  const thumbnailDimension = useMemo(() => {
    const width = state.width / noOfVisibleThumbs;

    let height = 0;

    if (props.thumbHeightFactor && !isThumbnailType) {
      height = state.height / props.thumbHeightFactor;
    } else if (isThumbnailType) {
      height = state.height;
    }

    return { width, height };
  }, [state.width, state.height]);

  const dotDimension = useMemo(() => {
    const width = state.width / 50;
    const height = state.height / 50;

    return { width, height };
  }, [state.width, state.height]);

  const theme = useTheme();

  const shouldHide = useMediaQuery(theme.breakpoints.down("sm"));

  const slideRef = useRef<HTMLDivElement>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const countDownRef = useRef(count);

  const onTransitionEndRef = useRef(() => {});

  const classes = useStyles({
    ...state,
    thumbHeight: thumbnailDimension.height,
  });

  const handlers = useSwipeable({
    trackMouse: true,
    trackTouch: true,
    preventDefaultTouchmoveEvent: true,
    onSwipedLeft: (event?: EventData) => {
      call(next)();
    },
    onSwipedRight: (event?: EventData) => {
      call(previous)();
    },
  });

  useEffect(() => {
    onTransitionEndRef.current = handleTransitionEnd;
  });

  useEffect(() => {
    const dimension = getDimension();

    const getPosition = () => {
      if (!isThumbnailType) {
        return 0 - dimension.width;
      }
      return state.position;
    };

    const onTransitionEnd = () => {
      if (slideRef.current && infinite) {
        slideRef.current.addEventListener("transitionend", () =>
          onTransitionEndRef.current()
        );
      }
    };

    const destroyTransitionEnd = () => {
      if (slideRef.current && infinite) {
        slideRef.current.removeEventListener("transitionend", () =>
          onTransitionEndRef.current()
        );
      }
    };

    const event = fromEvent(window, "resize")
      .pipe(debounceTime(250), map(getDimension))
      .subscribe((dimension) => {
        dispatch({
          type: "updateSize",
          payload: {
            ...dimension,
          },
        });
      });

    dispatch({
      type: "moveTo",
      payload: {
        ...state,
        position: getPosition(),
        height: dimension.height,
        width: dimension.width,
      },
    });

    onTransitionEnd();

    return () => {
      event.unsubscribe();
      destroyTransitionEnd();
    };
  }, []);

  useEffect(() => {
    const start = () => {
      if (props.autoplay) {
        resetAndStartCount();
      }
    };

    const cleanUpStarter = () => {
      if (props.autoplay) {
        destroyTimer;
      }
    };

    start();

    return cleanUpStarter;
  }, [state.activeIndex, state.position]);

  const getDimension = () => {
    let width = 0;
    let height = 0;

    if (sliderRef.current) {
      width = sliderRef.current.clientWidth;
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

  const startCountDown = () => {
    destroyTimer();
    timerRef.current = setInterval(countDownSeconds, SECONDS);
  };

  const resetAndStartCount = () => {
    countDownRef.current = count;
    startCountDown();
  };

  const refreshTimer = props.autoplay ? resetAndStartCount : () => null;

  const next = () => {
    const isLastSlide = state.activeIndex === nChildren - 1;
    // dont run unless it will interfere with the reflow
    if (state.dummyIndex === nChildren + CLONE - 1) return;

    // dont run when it has reach last slide and controls are manual
    if (isManual && isLastSlide) return;

    dispatch({
      type: "moveTo",
      payload: getNextPayload({ nChildren, state, infinite }),
    });
  };

  const previous = () => {
    // dont run unless it will interfere with the reflow
    if (state.dummyIndex === 0) return;

    // dont run when it has reach first slide and controls are manual
    if (isManual && state.activeIndex === 0) return;

    dispatch({
      type: "moveTo",
      payload: getPrevPayload({ nChildren, state, infinite }),
    });
  };

  const call = (callback: () => void) => {
    refreshTimer();
    return callback;
  };

  const goToIndex = (nextIndex: number) => {
    const payload = { nextIndex };

    refreshTimer();

    if (nextIndex === state.activeIndex) {
      return;
    } else if (nextIndex > state.activeIndex) {
      dispatch({
        type: "jumpforward",
        payload,
      });
    } else {
      dispatch({
        type: "jumpbackward",
        payload,
      });
    }
  };

  const pause = () => {
    destroyTimer();
  };

  const play = () => {
    startCountDown();
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
    if (pauseOnMouseEnter) return pause();
  };

  const handleOnMouseLeave = () => {
    if (pauseOnMouseEnter) return play();
  };

  const getCssClasses = (i: number, className?: string) => {
    const isFadeEffect = props.effectType === "fade";
    const isSlideEffect = props.effectType === "slide";

    return clsx(
      {
        [classes.fadeMove]: isFadeEffect,
        [classes.activeSlide]: isSlideEffect,
        [classes.spaceSlide]: !isThumbnailType && isSlideEffect,
      },
      className
    );
  };

  const renderItem = () => {
    const isFadeEffect = props.effectType === "fade";

    if (isFadeEffect) {
      return childrenWithClone.map(
        (child, i) =>
          React.isValidElement(child) && (
            <Fade in={child.props.__index === state.activeIndex} timeout={800}>
              {React.cloneElement(child, {
                className: getCssClasses(i, child.props.className),
                ref: slideRef,
              })}
            </Fade>
          )
      );
    }
    return childrenWithClone.map(
      (child, i) =>
        React.isValidElement(child) &&
        React.cloneElement(child, {
          className: getCssClasses(i, child.props.className),
          ref: slideRef,
        })
    );
  };

  const hideRightBtn = {
    [classes.disabledBtn]: isManual && state.activeIndex === nChildren - 1,
  };

  const hideLeftBtn = {
    [classes.disabledBtn]: isManual && state.activeIndex === 0,
  };

  return (
    <div
      ref={sliderRef}
      className={clsx(classes.wrapper, props.className, {
        [classes.noOverflow]: !isThumbnailType,
      })}
    >
      {props.children && (
        <div aria-label="slider" className={classes.container}>
          {!isThumbnailType && (
            <div
              {...handlers}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
              aria-label="slider-wrapper"
              className={clsx(classes.slider, {
                [classes.resizeSlider]: !isThumbnailType,
              })}
            >
              {renderItem()}
              {!props.disableButtons && !shouldHide && (
                <ButtonBase
                  onClick={call(previous)}
                  className={clsx(classes.btn, classes.leftBtn, hideLeftBtn)}
                >
                  <ArrowLeftIcon />
                </ButtonBase>
              )}

              {!props.disableButtons && !shouldHide && (
                <ButtonBase
                  onClick={call(next)}
                  className={clsx(classes.btn, classes.rightBtn, hideRightBtn)}
                >
                  <ArrowRightIcon />
                </ButtonBase>
              )}

              {/** dot indicator */}
              {(!props.disableIndicator || shouldHide) && (
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
          {(isThumbnailType || (props.showThumbs && !shouldHide)) && (
            <Thumbnail
              children={props.children}
              setIndex={goToIndex}
              activeIndex={state.activeIndex}
              thumbDimension={thumbnailDimension}
              noOfVisibleThumbs={noOfVisibleThumbs}
              focuserVisible={focuserVisible}
            />
          )}
        </div>
      )}
    </div>
  );
};

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
  pauseOnMouseEnter: false,
};

export default Slider;
