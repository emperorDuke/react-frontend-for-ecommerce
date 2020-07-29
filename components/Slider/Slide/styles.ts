import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export default makeStyles((theme: Theme) =>
  createStyles({
    base: {
      width: "inherit",
      height: "inherit",
      borderRadius: "inherit"
    },
    captionWrapper: {
      display: "flex",
      position: "absolute",
      backgroundColor: "black",
      opacity: 0.3,
      width: `calc(100% - ${theme.spacing(16)}px)`,
      left: theme.spacing(8),
      justifyContent: "center",
      boxShadow: theme.shadows[7],
      borderRadius: `0px 0px 8px 8px`,
      "&:hover": {
        cursor: "pointer",
        opacity: 0.7,
        transition: "opacity 500ms ease-in-out 50ms"
      }
    },
    caption: {
      ...theme.typography.subtitle1,
      color: "white",
      margin: "2px"
    },
    f: {
      border: "2px solid red"
    }
  })
);
