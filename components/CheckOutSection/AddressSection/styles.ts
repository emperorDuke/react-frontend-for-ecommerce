import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      textTransform: "capitalize",
    },
    textColor: {
      color: theme.palette.grey[500],
    },
    defaultAddressWrapper: {
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
      height: "100%",
      width: "100%",
      border: `1px solid ${theme.palette.primary.main}`,
    },
    addressCard: {
      padding: theme.spacing(2),
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
      width: "100%",
    },
  })
);
