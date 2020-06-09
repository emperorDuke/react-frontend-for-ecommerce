import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.grey[50]
    },
    btn: {
      fontSize: theme.typography.fontSize
    },
    paper: {
      padding: theme.spacing(1)
    }
  })
);
