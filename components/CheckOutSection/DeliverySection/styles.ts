import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { orange } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
    pickupSite: {
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.primary.main}`,
    },
    text: {
      textTransform: "capitalize",
    },
    textColor: {
      color: theme.palette.grey[500],
    },
    currentPickupStationCard: {
      width: "40%",
      marginLeft: "5%",
      border: `1px solid ${orange[500]}`,
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
    }
  })
);
