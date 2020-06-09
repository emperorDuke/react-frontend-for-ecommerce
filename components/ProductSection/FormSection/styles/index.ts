import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: theme.spacing(80)
    },
    pText: {
      fontSize: theme.typography.fontSize,
      fontColor: theme.palette.grey[500]
    },
    priceText: {
      fontSize: theme.typography.fontSize * 2
    },
    localShippinIcon: {
      marginRight: theme.spacing(1)
    },
    tooltip: {
      fontSize: theme.typography.fontSize,
      textTransform: "uppercase"
    },
    paperLayer: {
      padding: theme.spacing(2)
    },
    greyBackground: {
      backgroundColor: theme.palette.grey[50]
    },
    textWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(1),
      boxSizing: "border-box",
      backgroundColor: "#fff"
    },
    text: {
      ...theme.typography.button
    }
  })
);
