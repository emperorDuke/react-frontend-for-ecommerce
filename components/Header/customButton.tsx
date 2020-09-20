import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";

export const StyledButton = withStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.background.paper,
      "&$disabled": {
        color: theme.palette.grey[400],
      },
    },
    disabled: {},
    outlined: {
      borderColor: theme.palette.grey[400],
      color: theme.palette.grey[300],
      "&$disabled": {
        borderColor: theme.palette.grey[400],
      },
      "&:hover": {
        borderColor: theme.palette.grey[300],
      },
    },
    containedPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.background.paper,
      },
    },
  })
)(Button);
