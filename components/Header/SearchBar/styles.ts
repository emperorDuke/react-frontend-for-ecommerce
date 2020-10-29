import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export default makeStyles((theme: Theme) =>
  createStyles({
    selectRight: {
      fontSize: theme.typography.fontSize,
      borderRight: `1px solid ${theme.palette.grey[400]}`,
    },
    inputField: {
      border: `1px solid ${theme.palette.grey[400]}`,
      fontSize: theme.typography.fontSize,
      height: theme.spacing(6),
      borderRadius: theme.shape.borderRadius,
    },
    inputRoot: {
      width: theme.spacing(40),
      padding: "0px 0px 0px 10px",
      [theme.breakpoints.down("md")]: {
        width: theme.spacing(30),
      },
    },
    selectRootRight: {
      width: theme.spacing(16),
      padding: "0px 5px 0px 15px",
      "&:focus": {
        backgroundColor: theme.palette.background.paper,
      },
    },
    wrapper: {
      border: `1px solid transparent`,
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      "&:active": {
        border: `1px solid ${theme.palette.secondary.main}`,
      },
    },
    options: {
      ...theme.typography.body2,
    },
    focus: {
      border: `2px solid ${theme.palette.secondary.main}`,
    },
  })
);
