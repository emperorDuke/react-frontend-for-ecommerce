import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

interface Props {
  focuserPosition: number;
  thumbWidth: number;
  thumbHeight: number;
  thumbPosition: number;
  transition: boolean;
  focusThumbs: boolean;
}

const cssProps = (theme: Theme) => ({
  height: "100%",
  width: "100%",
  borderRadius: theme.shape.borderRadius,
});

export default makeStyles((theme: Theme) =>
  createStyles({
    thumbnailsWrapper: {
      position: "relative",
      display: "flex",
      backgroundColor: theme.palette.grey[100],
      "&:hover $btn": {
        opacity: 0.6,
        transition: "opacity 500ms ease-in-out 50ms",
        "&:hover": {
          cursor: "pointer",
          opacity: 0.9,
          transition: theme.transitions.create(["width", "left"], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeIn,
          }),
        },
      },
    },
    thumbnails: {
      position: "relative",
      display: "flex",
      boxShadow: theme.shadows[1],
      borderRadius: theme.shape.borderRadius,
      transform: (val: Props) => `translateX(${val.thumbPosition}px)`,
      transition: (val: Props) => val.transition ? "transform 300ms ease-in 50ms" : "none",
    },
    thumbWrapper: {
      padding: "1px",
      height: (val: Props) => `${val.thumbHeight}px`,
      width: (val: Props) => `${val.thumbWidth}px`,
      border: `2px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[800],
      borderRadius: theme.shape.borderRadius,
      "&:hover": {
        cursor: "pointer",
      },
    },
    thumb: {
      ...cssProps(theme),
      "& > div": {
        ...cssProps(theme),
      },
    },
    focuser: {
      position: "absolute",
      bottom: 0,
      height: (val: Props) => `${val.thumbHeight}px`,
      width: (val: Props) => `${val.thumbWidth}px`,
      border: `2px solid ${theme.palette.secondary.main}`,
      transform: (val: Props) => `translateX(${val.focuserPosition}px)`,
      transition: (val: Props) => val.transition ? "transform 600ms ease-in 10ms" : "none",
      borderRadius: theme.shape.borderRadius,
      display: (val: Props) => (val.focusThumbs ? "initial" : "none"),
    },
    btn: {
      backgroundColor: theme.palette.grey[300],
      position: "absolute",
      height: "100%",
      width: (val: Props) => `${val.thumbWidth / 2.5}px`,
      opacity: 0,
      zIndex: 2,
      boxShadow: "0px 0px 9px 1px black",
    },
    leftBtn: {
      bottom: 0,
    },
    onHoverLeftBtn: {
      "&:hover": {
        width: (val: Props) => `${val.thumbWidth / 2}px`,
      },
    },
    rightBtn: {
      bottom: 0,
      left: (val: Props) => `calc(100% - ${val.thumbWidth / 2.5}px)`,
    },
    onHoverRightBtn: {
      "&:hover": {
        width: (val: Props) => `${val.thumbWidth / 2}px`,
        left: (val: Props) => `calc(100% - ${val.thumbWidth / 2}px)`,
      },
    },
    disabledBtn: {
      display: "none",
    },
    activeThumb: {
      backgroundColor: theme.palette.secondary.main,
      "& > div": {
        borderTopRightRadius: theme.shape.borderRadius * 3,
        transition: "border-radius 500ms ease-in 600ms",
      },
    },
    notActiveThumb: {
      backgroundColor: "transparent",
    },
  })
);
