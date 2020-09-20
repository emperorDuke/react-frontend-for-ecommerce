import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export default makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      display: "flex",
      alignItems: "center",
      flexWrap: "nowrap",
      marginTop: theme.spacing(1),
      "& #spacer": {
        flexGrow: 1,
      },
    },
    error: {
      height: theme.spacing(2),
      flexGrow: 1,
      "& span": {
        color: "red",
        ...theme.typography.caption,
      },
    },
  })
);
