import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.grey[900],
      width: "100%",
      height: theme.spacing(50),
      border: "1px solid transparent",
      paddingTop: theme.spacing(1)
    },
    header: {
      color: theme.palette.secondary.main,
    },
    link: {
      color: "#FFFF"
    }
  })
);
