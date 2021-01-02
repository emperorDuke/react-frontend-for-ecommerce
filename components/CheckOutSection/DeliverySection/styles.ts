import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { orange } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      border: `1px solid ${orange[500]}`,
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
    },
    pickupStationInfo: {
      marginLeft: "5%",
    },
    extraInfo: {
      backgroundColor: theme.palette.grey[50],
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
    },
    padding: {
      padding: theme.spacing(1),
      '& > p': {
        fontWeight: theme.typography.fontWeightBold
      }
    },
    font: {
      fontWeight: theme.typography.fontWeightBold
    }
  })
);
