import React from "react";
import { useSwipeable } from "react-swipeable";
import ArrowLeftIcon from "@material-ui/icons/ArrowBack";
import ArrowRightIcon from "@material-ui/icons/ArrowForward";
import Fade from "@material-ui/core/Fade";
import ButtonBase from "@material-ui/core/ButtonBase";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "classnames";
import useStyles from "./styles";
import { Thumbnail } from "./Thumbnail";
import { Indicator } from "./Indicator";
import { getNextPayload, getPrevPayload } from "./utils";
import { fromEvent } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { SliderProps } from "./@types";
import { reducer } from "./reducer";
import { SlideProps } from "./Slide/@types";
import { useIsomorphicLayoutEffect } from "../../utils";

const Slider: React.ComponentType<SliderProps> = (props) => {
	const SECONDS = 1000;
	const CLONE = 2;
	const initHeight = Number(props.height) || 0;
	const initWidth = Number(props.width) || 0;
	const noOfVisibleThumbs = props.noOfVisibleThumbs || 4;
	const isThumbnailType = props.type === "thumbnail";
	const infinite = !!props.infinite;
	const isManual = !infinite && !props.autoplay;
	const pauseOnMouseEnter = props.autoplay && !!props.pauseOnMouseEnter;
	const nChildren = React.Children.count(props.children) || 0;
	const count = props.interval ? Math.floor(props.interval / SECONDS) : 5;
	const initFocusThumb = !isThumbnailType || !!props.focusThumbOnMount;
	
	const [state, dispatch] = React.useReducer(reducer, {
		slideNo: 1,
		position: 0,
		transition: false,
		activeIndex: 0,
		width: initWidth,
		height: initHeight,
	});

	const childrenWithClone = React.useMemo(() => {
		const insertKey = (el: any, i: number) => {
			if (React.isValidElement<SlideProps>(el)) {
				return React.cloneElement(el, {
					key: `clone_${i}`,
				});
			}
			return el;
		};

		const children = React.Children.map(props.children, (child, i) =>
			React.isValidElement<SlideProps>(child)
				? React.cloneElement(child, {
						__index: i,
				  })
				: child
		);

		const childrenArray = React.Children.toArray(children);
		const firstIndex = 0;
		const lastIndex = childrenArray.length - 1;
		const childrenArrayCopy = childrenArray.slice();
		const firstChild = childrenArray[firstIndex];
		const lastChild = childrenArray[lastIndex];

		childrenArrayCopy.push(insertKey(firstChild, firstIndex));
		childrenArrayCopy.unshift(insertKey(lastChild, lastIndex));

		return childrenArrayCopy;
	}, [props.children]);

	const thumbnailDimension = React.useMemo(() => {
		const width = state.width / noOfVisibleThumbs;

		let height = 0;

		if (props.thumbHeightFactor && !isThumbnailType) {
			height = state.height / props.thumbHeightFactor;
		} else if (isThumbnailType) {
			height = state.height;
		}

		return { width, height };
	}, [state.width, state.height]);

	const dotDimension = React.useMemo(() => {
		const width = state.width / 50;
		const height = state.height / 50;

		return { width, height };
	}, [state.width, state.height]);

	const theme = useTheme();

	const shouldHide = useMediaQuery(theme.breakpoints.down("sm"));

	const [highlightThumb, setHighlightThumb] = React.useState(initFocusThumb);

	const [thumbIsClicked, setThumbIsClicked] = React.useState(false);

	const slideRef = React.useRef<HTMLDivElement>(null);

	const sliderRef = React.useRef<HTMLDivElement>(null);

	const timerRef = React.useRef<NodeJS.Timeout | null>(null);

	const countDownRef = React.useRef(count);

	const onTransitionEndRef = React.useRef(() => {});

	const classes = useStyles({
		...state,
		thumbHeight: thumbnailDimension.height,
		timeout: props.timeout,
	});

	const handlers = useSwipeable({
		trackMouse: true,
		trackTouch: true,
		preventDefaultTouchmoveEvent: true,
		onSwipedLeft: () => call(next)(),
		onSwipedRight: () => call(previous)(),
	});

	React.useEffect(() => {
		if (!highlightThumb && thumbIsClicked) {
			setHighlightThumb(true);
		}
	}, [thumbIsClicked]);

	React.useEffect(() => {
		const handleTransitionEnd = () => {
			const isFirstClone = state.slideNo === 0;
			const isLastClone = state.slideNo === nChildren + CLONE - 1;
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

		onTransitionEndRef.current = handleTransitionEnd;
	}, [state.slideNo, nChildren, CLONE]);

	useIsomorphicLayoutEffect(() => {
		const getDimension = () => {
			let width = 0;
			let height = 0;

			if (sliderRef.current) {
				width = sliderRef.current.clientWidth;
				height = sliderRef.current.clientHeight;
			}
			return { width, height };
		};

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

	React.useEffect(() => {
		if (props.autoplay) {
			resetAndStartCount();

			return () => destroyTimer();
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
		// dont run unless it will interfere with the reflow
		if (state.slideNo === nChildren + CLONE - 1) return;

		// dont run if index has reach last slide and controls are manual
		if (isManual && state.activeIndex === nChildren - 1) return;

		dispatch({
			type: "moveTo",
			payload: getNextPayload({ nChildren, state, infinite }),
		});
	};

	const previous = () => {
		// dont run unless it will interfere with the reflow
		if (state.slideNo === 0) return;

		// dont run if it has reach first slide and controls are manual
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

		// applies to the thumbnail section of this code
		// checks if thumbnail is clicked
		if (isThumbnailType && !props.focusThumbOnMount && !thumbIsClicked) {
			setThumbIsClicked(true);
		}

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

	const handleOnMouseEnter = () => {
		if (pauseOnMouseEnter) return pause();
	};

	const handleOnMouseLeave = () => {
		if (pauseOnMouseEnter) return play();
	};

	const getCssClasses = (className?: string) => {
		const isFadeEffect = props.effectType === "fade";
		const isSlideEffect = props.effectType === "slide";

		return clsx(
			{
				[classes.activeFade]: isFadeEffect,
				[classes.activeSlide]: isSlideEffect,
			},
			className
		);
	};

	const Slides = () => {
		const isFadeEffect = props.effectType === "fade";

		if (isFadeEffect) {
			return (
				<React.Fragment>
					{childrenWithClone.map(
						(child, i) =>
							React.isValidElement(child) && (
								<Fade
									in={child.props.__index === state.activeIndex}
									timeout={props.timeout}
									key={i}
								>
									{React.cloneElement(child, {
										className: getCssClasses(child.props.className),
										ref: slideRef,
									})}
								</Fade>
							)
					)}
				</React.Fragment>
			);
		}
		return (
			<React.Fragment>
				{childrenWithClone.map(
					(child) =>
						React.isValidElement(child) &&
						React.cloneElement(child, {
							className: getCssClasses(child.props.className),
							ref: slideRef,
						})
				)}
			</React.Fragment>
		);
	};
	const hideRightBtn = {
		[classes.disabledBtn]: isManual && state.activeIndex === nChildren - 1,
	};

	const hideLeftBtn = {
		[classes.disabledBtn]: isManual && state.activeIndex === 0,
	};

	return (
		<div ref={sliderRef} className={clsx(classes.wrapper, props.className)}>
			{props.children && (
				<div aria-label="slider" className={classes.container}>
					{!isThumbnailType && (
						<div
							{...handlers}
							onMouseEnter={handleOnMouseEnter}
							onMouseLeave={handleOnMouseLeave}
							aria-label="slider-wrapper"
							className={classes.slider}
						>
							{Slides()}
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
								<Indicator
									nChildren={nChildren}
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
							setIndex={goToIndex}
							activeIndex={state.activeIndex}
							thumbDimension={thumbnailDimension}
							noOfVisibleThumbs={noOfVisibleThumbs}
							focusThumbOnMount={highlightThumb}
							standalone={isThumbnailType}
						>
							{props.children}
						</Thumbnail>
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
	timeout: 800,
	focusThumbOnMount: false,
};

export default Slider;
