import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

type StyleProps = {
  position: number;
  height: number;
  width: number;
  transition: boolean;
  thumbHeight: number;
};

type T = (val: StyleProps) => string;

const getHeight: T = (val) => `${val.height - val.thumbHeight}px`;

const getWidth: T = (val) => `${val.width}px`;

const getTransform: T = (val) => `translateX(${val.position}px)`;

const getSlideEffectTransition: T = (val) => {
  if (!val.transition) {
    return "none";
  }
  return "transform 500ms ease-in-out 20ms";
};

const getFadeEffectTransition = (theme: Theme) => (val: StyleProps) => {
  if (!val.transition) {
    return "none";
  }

  return theme.transitions.create("opacity", {
    duration: theme.transitions.duration.complex,
    easing: theme.transitions.easing.easeInOut,
    delay: "20ms",
  });
};

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      borderRadius: theme.shape.borderRadius,
      overflow: "hidden",
      flexGrow: 1,
    },
    noOverflow: {
      [theme.breakpoints.down("sm")]: {
        overflow: "visible",
      },
    },
    slider: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      borderRadius: "inherit",
      height: getHeight,
      width: getWidth,
      "&:hover $btn": {
        opacity: 0.4,
        cursor: "pointer",
        transition: "opacity 500ms ease-in 50ms",
        "&:hover": {
          opacity: 0.9,
          cursor: "pointer",
          transition: "opacity 500ms ease-in 50ms",
        },
      },
    },
    resizeSlider: {
      [theme.breakpoints.down("sm")]: {
        // the spacing(1) at marginLeft of slide is substracted from
        // the incoming width to balance it out
        width: (state: StyleProps) => state.width - theme.spacing(1),
        height: (state: StyleProps) => `${state.height}px`,
      },
    },
    activeSlide: {
      transform: getTransform,
      transition: getSlideEffectTransition,
    },
    spaceSlide: {
      [theme.breakpoints.down("sm")]: {
        // space the image
        margin: theme.spacing(0, 0, 0, 1),
      },
    },
    fadeMove: {
      transform: getTransform,
    },
    btn: {
      backgroundColor: theme.palette.grey[300],
      position: "absolute",
      height: "100%",
      opacity: 0,
      width: (val: StyleProps) => `${val.width / 10}px`,
      zIndex: 2,
    },
    leftBtn: {
      bottom: "0%",
    },
    rightBtn: {
      bottom: "0%",
      left: (val: StyleProps) => `calc(100% - ${val.width / 10}px)`,
    },
    disabledBtn: {
      display: "none",
    },
  })
);
