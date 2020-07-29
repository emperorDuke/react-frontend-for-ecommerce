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

const getWidth: T = (val) => {
  if (val.width === 0) {
    return "100%";
  } else {
    return `${val.width}px`;
  }
};

const getTransform: T = (val) => `translateX(${val.position}px)`;

const getTransition: T = (val) => {
  if (!val.transition) {
    return "none";
  } else {
    return "transform 500ms ease-in-out 20ms";
  }
};

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      borderRadius: theme.shape.borderRadius,
      overflow: "hidden",
      width: getWidth,
    },
    slider: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      position: "relative",
      borderRadius: "inherit",
      width: getWidth,
      height: getHeight,
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
    slideWrapper: {
      transform: getTransform,
      transition: getTransition,
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
    disabledButton: {
      display: "none"
    }
  })
);
