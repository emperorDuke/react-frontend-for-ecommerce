import React, { useRef, Children, useReducer, useEffect } from "react";
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

  const theme = useTheme();

  const viewport = useWidth();

  const [state, dispatch] = useReducer(reducer, {
    activeIndex: SIZES[viewport][CARD_SIZE],
    position: 0,
    parentElWidth: 0,
    numberOfCards: SIZES[viewport][CARD_SIZE],
    nChildren: Children.count(props.children),
    transition: true,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);

  const numberOfCardsRef = useRef(SIZES[viewport][CARD_SIZE]);

  const classes = useStyles({
    cardWidth: state.parentElWidth / state.numberOfCards,
    position: state.position,
    transition: state.transition,
  });

  useEffect(() => {
    numberOfCardsRef.current = SIZES[viewport][CARD_SIZE];
  }, [viewport]);

  useEffect(() => {
    dispatch({
      type: "update",
      payload: {
        activeIndex: SIZES[viewport][CARD_SIZE],
        parentElWidth: getElWidth(),
        numberOfCards: SIZES[viewport][CARD_SIZE],
        transition: false,
      },
    });

    const event = fromEvent(window, "resize")
      .pipe(
        debounceTime(250),
        map(getElWidth),
        map((width) => ({ width, nCards: numberOfCardsRef.current }))
      )
      .subscribe(({ width, nCards }) =>
        dispatch({
          type: "onResize",
          payload: {
            width,
            nCards,
          },
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
    });
  };

  const previousGroup = () => {
    dispatch({
      type: "movebackward",
    });
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
    <IconButton
      onClick={nextGroup}
      disabled={state.activeIndex === state.nChildren}
    >
      <ChevronRightIcon />
    </IconButton>
  );

  const buttonLeft = (
    <IconButton
      onClick={previousGroup}
      disabled={state.activeIndex === state.numberOfCards}
    >
      <ChevronLeftIcon />
    </IconButton>
  );

  const CardEnhancement = () => {
    const { appBar, appBarProps, disableToggler } = props;

    if (!disableToggler && !appBar) {
      return (
        <div style={{ position: "relative" }}>
          <Cards />
          {state.nChildren > state.numberOfCards && (
            <Paper className={clsx(classes.btn, classes.leftBtn)} elevation={5}>
              {buttonRight}
            </Paper>
          )}
          {state.nChildren > state.numberOfCards && (
            <Paper
              className={clsx(classes.btn, classes.rightBtn)}
              elevation={5}
            >
              {buttonLeft}
            </Paper>
          )}
        </div>
      );
    } else if (appBar) {
      return (
        <Grid container direction="column">
          <Grid item>
            <div
              style={{
                width: state.parentElWidth,
              }}
            >
              <AppBar position="static" color="secondary">
                <Toolbar>
                  <Typography variant="h6">
                    {appBarProps && appBarProps.text}
                  </Typography>
                  <div style={{ flexGrow: 1 }} />
                  <div style={{ paddingRight: theme.spacing(1) }}>
                    {appBarProps && appBarProps.link && (
                      <Link href={appBarProps.link}>
                        <Typography variant="subtitle1">View all</Typography>
                      </Link>
                    )}
                  </div>

                  {appBarProps && !appBarProps.disableToggler && (
                    <div
                      style={{ display: "inline-flex", flexDirection: "row" }}
                    >
                      {buttonLeft}
                      {buttonRight}
                    </div>
                  )}
                </Toolbar>
              </AppBar>
            </div>
          </Grid>
          <Grid item>
            <Cards />
          </Grid>
        </Grid>
      );
    } else {
      return <Cards />;
    }
  };

  return (
    <div
      style={{ overflow: "hidden", maxWidth: state.parentElWidth }}
      ref={wrapperRef}
    >
      <CardEnhancement />
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
