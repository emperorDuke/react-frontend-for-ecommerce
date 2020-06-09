import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export default makeStyles((theme: Theme) =>
  createStyles({
    selectLeft: {
      fontSize: theme.typography.fontSize,
      borderRight: `1px solid ${theme.palette.grey[400]}`
    },
    selectRight: {
      fontSize: theme.typography.fontSize,
      borderLeft: `1px solid ${theme.palette.grey[400]}`
    },
    inputField: {
      border: `1px solid ${theme.palette.grey[400]}`,
      fontSize: theme.typography.fontSize,
      height: theme.spacing(6),
      borderRadius: theme.shape.borderRadius
    },
    inputRoot: {
      width: theme.spacing(40),
      padding: "0px 0px 0px 10px"
    },
    selectRootRight: {
      width: theme.spacing(16),
      padding: "0px 5px 0px 15px",
      "&:focus": {
        backgroundColor: theme.palette.background.paper
      }
    },
    selectRootLeft: {
      width: theme.spacing(10),
      padding: "0px 5px 0px 15px",
      "&:focus": {
        backgroundColor: theme.palette.background.paper
      }
    },
    button: {
      height: theme.spacing(6),
    },
    searchIcon: {
      fontSize: theme.typography.fontSize * 2
    }
  })
);
