import React, { useRef, Children, useReducer, useEffect, useMemo } from "react";
import clsx from "classnames";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Link from "../Link";
import { CardEnhancerProps } from "./@types";
import useStyles from "./styles";
import useTheme from "@material-ui/core/styles/useTheme";
import { reducer, SIZES } from "./utils";
import { useWidth } from "../../utils";
import { fromEvent } from "rxjs";
import { map, debounceTime } from "rxjs/operators";

const CardGroup: React.ComponentType<CardEnhancerProps> = (props) => {
	const CARD_SIZE = props.size || "md";
	const nChildren = Children.count(props.children);

	const theme = useTheme();

	const viewport = useWidth();

	const [state, dispatch] = useReducer(reducer, {
		activeIndex: 0,
		position: 0,
		parentElWidth: 0,
		transition: true,
	});

	const cardWidth = useMemo(() => {
		const numberOfCards = SIZES[viewport][CARD_SIZE];

		return state.parentElWidth / numberOfCards;
	}, [state.parentElWidth, viewport]);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const onResizeRef = useRef({
		numberOfCards: SIZES[viewport][CARD_SIZE],
		cardWidth,
	});

	const previousViewport = useRef(viewport);

	const classes = useStyles({
		cardWidth: state.parentElWidth / SIZES[viewport][CARD_SIZE],
		position: state.position,
		transition: state.transition,
	});

	useEffect(() => {
		const payload = {
			numberOfCards: SIZES[viewport][CARD_SIZE],
			cardWidth,
		};

		onResizeRef.current = payload;
	}, [viewport, cardWidth]);

	useEffect(() => {
		const previousSize = SIZES[previousViewport.current][CARD_SIZE];
		const currentSize = SIZES[viewport][CARD_SIZE];

		if (currentSize < previousSize) {
			//screen was minimized //

			if (state.activeIndex <= previousSize) {
				dispatch({
					type: "update",
					payload: {
						position: 0,
						activeIndex: currentSize,
						transition: true,
					},
				});
			} else {
				const prevPosition = getPrevPosition(previousSize);
				const nTime = previousSize - currentSize;

				dispatch({
					type: "update",
					payload: {
						position: prevPosition - cardWidth * nTime,
						transition: true,
					},
				});
			}
		} else {
			// screen was expanded //

			if (state.activeIndex <= currentSize) {
				dispatch({
					type: "update",
					payload: {
						position: 0,
						activeIndex: currentSize,
						transition: true,
					},
				});
			} else {
				const nTime = state.activeIndex - currentSize;

				dispatch({
					type: "update",
					payload: {
						position: 0 - cardWidth * nTime,
						transition: true,
					},
				});
			}
		}

		previousViewport.current = viewport;
	}, [viewport]);

	useEffect(() => {
		dispatch({
			type: "update",
			payload: {
				activeIndex: SIZES[viewport][CARD_SIZE],
				parentElWidth: getElWidth(),
				transition: false,
			},
		});

		const event = fromEvent(window, "resize")
			.pipe(
				debounceTime(150),
				map(getElWidth),
				map((parentElWidth) => ({ parentElWidth, ...onResizeRef.current }))
			)
			.subscribe((payload) =>
				dispatch({
					type: "onResize",
					payload,
				})
			);

		return event.unsubscribe;
	}, []);

	const getElWidth = () => {
		if (wrapperRef.current && wrapperRef.current.parentElement) {
			return wrapperRef.current.parentElement.clientWidth;
		} else {
			return 0;
		}
	};

	const nextGroup = () => {
		dispatch({
			type: "moveforward",
			payload: {
				cardWidth,
				nChildren,
			},
		});
	};

	const previousGroup = () => {
		const numberOfCards = SIZES[viewport][CARD_SIZE];

		dispatch({
			type: "movebackward",
			payload: {
				cardWidth,
				numberOfCards,
			},
		});
	};

	const getPrevPosition = (prevNumberOfCards: number) => {
		let prevPosition = 0;

		if (state.activeIndex <= prevNumberOfCards) {
			prevPosition = 0;
		} else {
			const nTime = state.activeIndex - prevNumberOfCards;
			prevPosition = 0 - cardWidth * nTime;
		}

		return prevPosition;
	};

	const Cards = () => {
		const { children, appBar, disableToggler, size, cardType } = props;

		const wrap = appBar || !disableToggler ? "nowrap" : "wrap";

		const direction = cardType && cardType === "list" ? "column" : "row";

		let enhancedChildren: JSX.Element[] | undefined | null;

		if (cardType && cardType === "list") {
			enhancedChildren = Children.map(children, (child, i) => (
				<Grid item key={i}>
					{child}
				</Grid>
			));
		} else {
			enhancedChildren = Children.map(children, (child, i) => (
				<Grid item key={i} className={classes.cardWrapper}>
					{React.isValidElement(child) &&
						React.cloneElement(child, {
							classes: { img: classes.cardImage },
							size: size,
						})}
				</Grid>
			));
		}

		return (
			<Grid container spacing={1} wrap={wrap} direction={direction}>
				{enhancedChildren}
			</Grid>
		);
	};

	const buttonRight = (
		<IconButton onClick={nextGroup} disabled={state.activeIndex === nChildren}>
			<ChevronRightIcon />
		</IconButton>
	);

	const buttonLeft = (
		<IconButton
			onClick={previousGroup}
			disabled={state.activeIndex === SIZES[viewport][CARD_SIZE]}
		>
			<ChevronLeftIcon />
		</IconButton>
	);

	const CardEnhancement = () => {
		const { appBar, appBarProps, disableToggler } = props;
		const numberOfCards = SIZES[viewport][CARD_SIZE];

		if (!disableToggler && !appBar) {
			return (
				<div style={{ position: "relative" }}>
					{Cards()}
					{nChildren > numberOfCards && (
						<Paper className={clsx(classes.btn, classes.leftBtn)} elevation={5}>
							{buttonRight}
						</Paper>
					)}
					{nChildren > numberOfCards && (
						<Paper className={clsx(classes.btn, classes.rightBtn)} elevation={5}>
							{buttonLeft}
						</Paper>
					)}
				</div>
			);
		} else if (appBar) {
			return (
				<Grid container direction="column">
					<Grid item xs={12}>
						<AppBar position="static" color="secondary">
							<Toolbar>
								<Typography variant="h6">{appBarProps && appBarProps.text}</Typography>
								<div style={{ flexGrow: 1 }} />
								<div style={{ paddingRight: theme.spacing(1) }}>
									{appBarProps && appBarProps.link && (
										<Link href={appBarProps.link}>
											<Typography variant="subtitle1">View all</Typography>
										</Link>
									)}
								</div>

								{appBarProps && !appBarProps.disableToggler && (
									<div style={{ display: "inline-flex", flexDirection: "row" }}>
										{buttonLeft}
										{buttonRight}
									</div>
								)}
							</Toolbar>
						</AppBar>
					</Grid>
					<Grid item>{Cards()}</Grid>
				</Grid>
			);
		} else {
			return Cards();
		}
	};

	return (
		<div
			style={{ overflow: "hidden", maxWidth: state.parentElWidth }}
			ref={wrapperRef}
		>
			{CardEnhancement()}
		</div>
	);
};

CardGroup.defaultProps = {
	size: "md",
	disableToggler: false,
	appBar: false,
	appBarProps: {
		text: "",
		disableToggler: false,
		link: "/",
	},
};

export default CardGroup;
