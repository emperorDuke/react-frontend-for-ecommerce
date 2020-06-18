import React, { useState, useRef, Children, useMemo } from "react";
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
import { useIsomorphicLayoutEffect } from "../../utils/useIsomorphicEffect";

const sizes: { [key: string]: number } = { sm: 6, md: 5, lg: 4 };

const CardEnhancer: React.ComponentType<CardEnhancerProps> = props => {
  const nCards = props.size ? sizes[props.size] : sizes.md;

  const theme = useTheme();

  const [value, setValue] = useState({ idx: nCards, position: 0 });

  const [parentElWidth, setParentElWidth] = useState(0);

  const nChildren = useMemo(() => {
    if (props.children) {
      return Children.count(props.children);
    }
    return 0;
  }, [props.children]);

  const cardDims = parentElWidth / nCards;

  const disableRightBtn = value.idx === nChildren;

  const disableLeftBtn = value.idx === nCards;

  const thisRef = useRef<HTMLDivElement>(null);

  const classes = useStyles({
    cardDims,
    position: value.position
  });

  useIsomorphicLayoutEffect(() => {
    if (thisRef.current) {
      const parentEl = thisRef.current.parentElement;
      if (parentEl) {
        setParentElWidth(parentEl.clientWidth);
      }
    }
  }, []);

  const nextGroup = () => {
    setValue(prev => ({
      idx: prev.idx === nChildren ? prev.idx : prev.idx + 1,
      position:
        prev.idx === nChildren ? prev.position : prev.position + -cardDims
    }));
  };

  const previousGroup = () => {
    setValue(prev => ({
      idx: prev.idx === nCards ? nCards : prev.idx - 1,
      position: prev.idx === nCards ? 0 : prev.position + cardDims
    }));
  };

  const renderCards = () => {
    const { children, appBar, disableToggler, size, cardType } = props;

    const wrap = appBar || !disableToggler ? "nowrap" : "wrap";

    const direction = cardType && cardType === "list" ? "column" : "row";

    let enhancedChildren: React.ReactNodeArray | undefined;

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
              size: size
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

  const propsSorter = () => {
    const { appBar, appBarProps, disableToggler } = props;

    if (!disableToggler && !appBar) {
      return (
        <div style={{ position: "relative" }}>
          {renderCards()}
          <Paper className={clsx(classes.btn, classes.leftBtn)} elevation={5}>
            <IconButton onClick={nextGroup} disabled={disableRightBtn}>
              <ChevronRightIcon />
            </IconButton>
          </Paper>
          <Paper className={clsx(classes.btn, classes.rightBtn)} elevation={5}>
            <IconButton onClick={previousGroup} disabled={disableLeftBtn}>
              <ChevronLeftIcon />
            </IconButton>
          </Paper>
        </div>
      );
    } else if (appBar) {
      return (
        <Grid container direction="column">
          <Grid item>
            <div
              style={{
                width: parentElWidth
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
                      <Link href="/">
                        <Typography variant="subtitle1">View all</Typography>
                      </Link>
                    )}
                  </div>

                  {appBarProps && !appBarProps.disableToggler && (
                    <div
                      style={{ display: "inline-flex", flexDirection: "row" }}
                    >
                      <IconButton
                        onClick={previousGroup}
                        disabled={disableLeftBtn}
                      >
                        <ChevronLeftIcon />
                      </IconButton>
                      <IconButton
                        onClick={nextGroup}
                        disabled={disableRightBtn}
                      >
                        <ChevronRightIcon />
                      </IconButton>
                    </div>
                  )}
                </Toolbar>
              </AppBar>
            </div>
          </Grid>
          <Grid item>{renderCards()}</Grid>
        </Grid>
      );
    } else {
      return renderCards();
    }
  };

  return (
    <div style={{ overflow: "hidden", maxWidth: parentElWidth }} ref={thisRef}>
      {propsSorter()}
    </div>
  );
};

CardEnhancer.defaultProps = {
  size: "lg",
  disableToggler: false,
  appBar: false,
  appBarProps: {
    text: "",
    disableToggler: false,
    link: ""
  }
};

export default CardEnhancer;
