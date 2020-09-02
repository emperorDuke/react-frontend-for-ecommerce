import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

type StyleProps = {
  position: number;
  height: number;
  width: number;
  transition: boolean;
  thumbHeight: number;
  timeout?: number
};

type T = (val: StyleProps) => string;

const getHeight: T = (val) => `${val.height - val.thumbHeight}px`;

const getWidth: T = (val) => `${val.width}px`;

const getTransform: T = (val) => `translateX(${val.position}px)`;

const getSlideEffectTransition: T = (val) => {
  if (!val.transition) {
    return "none";
  }
  return `transform ${val.timeout}ms ease-in`;
};

export default makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      flexGrow: 1,
      overflow: "hidden",
      borderRadius: theme.shape.borderRadius,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      borderRadius: theme.shape.borderRadius,
    },
    noOverflow: {
      [theme.breakpoints.down("sm")]: {
        overflow: "visible",
      },
    },
    slider: {
      display: "flex",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      height: getHeight,
      width: getWidth,
      "&:hover $btn": {
        opacity: 0.4,
        cursor: "pointer",
        transition: "opacity 500ms ease-in",
        "&:hover": {
          opacity: 0.9,
          cursor: "pointer",
          transition: "opacity 500ms ease-in",
        },
      },
      [theme.breakpoints.down("sm")]: {
        // the spacing(1) at marginLeft of slide is substracted from
        // the incoming width to balance it out
        width: (state: StyleProps) => `${state.width - theme.spacing(1)}px`,
        height: (state: StyleProps) => `${state.height}px`,
      },
    },
    activeSlide: {
      transform: getTransform,
      transition: getSlideEffectTransition,
    },
    spaceSlides: {
      [theme.breakpoints.down("sm")]: {
        // space the image
        margin: theme.spacing(0, 0, 0, 1),
      },
    },
    activeFade: {
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
