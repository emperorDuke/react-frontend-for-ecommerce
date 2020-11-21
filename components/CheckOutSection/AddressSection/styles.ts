import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { orange } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
    text: {
      textTransform: "capitalize",
    },
    textColor: {
      color: theme.palette.grey[500],
    },
    tooltip: {
      ...theme.typography.caption,
      textTransform: "capitalize",
    },
    addressWrapper: {
      maxHeight: theme.spacing(40),
      overflowY: "auto",
    },
    defaultAddressWrapper: {
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1),
      height: "100%",
      width: "100%",
      border: `1px solid ${orange[500]}`,
    },
    addressCard: {
      padding: theme.spacing(1),
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
      width: "100%",
    },
  })
);
