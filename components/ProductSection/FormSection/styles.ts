import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles((theme: Theme) =>
  createStyles({
    capText: {
      textTransform: "capitalize"
    },
    green: {
      backgroundColor: theme.palette.success.main,
      padding: theme.spacing(0, 1, 0, 1),
      color: theme.palette.success.contrastText,
    },
    greyWrapper: {
      backgroundColor: theme.palette.grey[50]
    },
    flexGrow: {
      flexGrow: 1
    },
    padding: {
      padding: theme.spacing(1)
    },
    textWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(1),
      boxSizing: "border-box",
      backgroundColor: "#fff"
    },
    text: {
      ...theme.typography.button
    },
    thumnbnail: {
      width: "100%",
      height: theme.spacing(6)
    },
    cartBtn: {
      backgroundColor: theme.palette.primary.light,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        color: "#FFF"
      }
    }
  })
);
