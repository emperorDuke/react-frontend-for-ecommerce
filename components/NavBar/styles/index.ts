import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface StyleType {
  height: number;
}

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.paper,
      width: theme.spacing(30)
    },
    fonts: {
      fontSize: theme.typography.fontSize
    },
    navHeader: {
      display: "block",
      backgroundColor: theme.palette.grey[100],
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius
    },
    paper: {
      marginLeft: theme.spacing(1)
    }
  })
);
