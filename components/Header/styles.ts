import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles((theme: Theme) =>
  createStyles({
    badge: {
      fontSize: theme.typography.fontSize,
      top: 0,
      right: 2,
      border: `2px solid ${theme.palette.grey[200]}`,
    },
    header: {
      backgroundColor: "#FFF",
    },
    subHeaderWrapper_1: {
      backgroundColor: theme.palette.primary.main,
    },
    subHeaderWrapper_2: {
      backgroundColor: theme.palette.primary.dark,
    },
    loginPaper: {
      width: theme.spacing(30),
      overflow: "hidden"
    },
    divider: {
      height: "1px",
      flexGrow: 1,
      borderBottom: `1px solid ${theme.palette.grey[400]}`,
    },
    spacer: {
      width: theme.spacing(1)
    },
    btn: {
      width: theme.spacing(5)
    }
  })
);