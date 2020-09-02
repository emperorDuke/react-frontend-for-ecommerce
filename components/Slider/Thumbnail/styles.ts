import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

interface StyleProps {
  focuserPosition: number;
  thumbWidth: number;
  thumbHeight: number;
  thumbPosition: number;
  transition: boolean;
  focusThumbs: boolean;
}

export default makeStyles((theme: Theme) =>
  createStyles({
    thumbnailsWrapper: {
      position: "relative",
      display: "flex",
      "&:hover $btn": {
        opacity: 0.6,
        transition: "opacity 500ms ease-in-out 50ms",
        "&:hover": {
          cursor: "pointer",
          opacity: 0.9,
        },
      },
    },
    thumbnails: {
      position: "relative",
      boxShadow: theme.shadows[1],
      borderRadius: theme.shape.borderRadius,
      transform: (val: StyleProps) => `translateX(${val.thumbPosition}px)`,
      transition: (val: StyleProps) =>
        val.transition ? "transform 300ms ease-in 50ms" : "none",
    },
    thumbWrapperContainer: {
      padding: "2px",
      boxSizing: "border-box",
      height: (val: StyleProps) => `${val.thumbHeight}px`,
      width: (val: StyleProps) => `${val.thumbWidth}px`,
      border: `2px solid ${theme.palette.grey[400]}`,
      backgroundColor: `${theme.palette.grey[800]}`,
      borderRadius: theme.shape.borderRadius,
      "&:hover": {
        cursor: "pointer",
      },
    },
    thumbWrapper: {
      height: "100%",
      width: "100%",
      borderRadius: theme.shape.borderRadius,
    },
    focuser: {
      position: "absolute",
      bottom: 0,
      height: (val: StyleProps) => `${val.thumbHeight}px`,
      width: (val: StyleProps) => `${val.thumbWidth}px`,
      border: `2px solid ${theme.palette.secondary.main}`,
      transform: (val: StyleProps) => `translateX(${val.focuserPosition}px)`,
      transition: (val: StyleProps) =>
        val.transition ? "transform 600ms ease-in 10ms" : "none",
      borderRadius: theme.shape.borderRadius,
      display: (val: StyleProps) => val.focusThumbs ? "initial" : "none"
    },
    thumbsWrapper: {
      display: "flex",
      flexDirection: "row",
    },
    btn: {
      backgroundColor: theme.palette.grey[300],
      position: "absolute",
      height: "100%",
      width: (val: StyleProps) => `${val.thumbWidth / 2.5}px`,
      opacity: 0,
      zIndex: 2,
      boxShadow: "0px 0px 9px 1px black",
    },
    leftBtn: {
      bottom: 0,
    },
    rightBtn: {
      bottom: 0,
      left: (val: StyleProps) => `calc(100% - ${val.thumbWidth / 2.5}px)`,
    },
    disabledBtn: {
      display: "none",
    },
  })
);
