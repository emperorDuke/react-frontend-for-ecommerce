import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export default makeStyles((theme: Theme) =>
  createStyles({
    flag: {
      backgroundColor: theme.palette.secondary.light,
      padding: theme.spacing(0, 1, 0, 1),
      color: theme.palette.secondary.contrastText
    },
    linkClass: {
      "&:hover": {
        textDecoration: "none"
      },
      color: "inherit"
    },
    text: {
      textTransform: "capitalize"
    }
  })
);
