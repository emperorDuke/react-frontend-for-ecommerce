import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export default makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      display: "flex",
      flexDirection: "column",
    },
    error: {
      height: theme.spacing(2),
      flexGrow: 1,
      color: theme.palette.error.main,
      "& span": {
        ...theme.typography.caption
      }
    },
    label: {
      textTransform: "capitalize"
    }
  })
);
