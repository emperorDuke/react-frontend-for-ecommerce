import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
      width: "100%",
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
  })
);
