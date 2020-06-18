import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

type StyleProps = {
  position: number;
  dummyIndex: number;
  height: number;
  width: number;
  isThumbnails?: boolean;
  shouldTransition: boolean;
};

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      borderRadius: theme.shape.borderRadius,
      width: (val: StyleProps) => (val.width === 0 ? "100%" : `${val.width}px`),
      overflow: "hidden",
      height: (val: StyleProps) => (val.isThumbnails ? "auto" : "100%")
    },
    slider: {
      display: "flex",
      position: "relative",
      borderRadius: "inherit",
      width: "inherit",
      height: (val: StyleProps) =>
        val.isThumbnails
          ? "auto"
          : val.height === 0
          ? "calc(100% - 20%)"
          : `${val.height}px`,
      "&:hover $btn": {
        opacity: 0.4,
        cursor: "pointer",
        transition: "opacity 500ms ease-in 50ms",
        "&:hover": {
          opacity: 0.9,
          cursor: "pointer",
          transition: "opacity 500ms ease-in 50ms"
        }
      }
    },
    slideWrapper: {
      transform: (val: StyleProps) => `translateX(${val.position}px)`,
      transition: (val: StyleProps) =>
        !val.shouldTransition ? "none" : "transform 500ms ease-in-out 20ms"
    },
    btn: {
      backgroundColor: theme.palette.grey[300],
      position: "absolute",
      height: "100%",
      opacity: 0,
      width: theme.spacing(8),
      zIndex: 2
    },
    leftBtn: {
      bottom: 0
    },
    rightBtn: {
      bottom: 0,
      left: `calc(100% - ${theme.spacing(8)}px)`
    },
    "@keyframes fadeIn": {
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      }
    },
    fade: {
      animation: "$fadeIn 500ms ease-in-out 20ms"
    }
  })
);
