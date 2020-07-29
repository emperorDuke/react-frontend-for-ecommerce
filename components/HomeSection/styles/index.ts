import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export default makeStyles((theme: Theme) =>
  createStyles({
    cardMasterLayout: {
      flexGrow: 1
    },
    image: {
      width: '100%',
      height: theme.spacing(15)
    },
    t: {
      padding: theme.spacing(1),
      textTransform: "capitalize"
    },
    slider:{
      height: theme.spacing(20),
    }
  })
);
