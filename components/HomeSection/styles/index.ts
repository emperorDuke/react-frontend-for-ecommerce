import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export default makeStyles((theme: Theme) =>
  createStyles({
    cardMasterLayout: {
      flexGrow: 1
    },
    sliderDim: {
      width: theme.spacing(86),
      height: theme.spacing(50),
      [theme.breakpoints.down("md")]: {
        width: theme.spacing(40),
        height: theme.spacing(50),
      },
      [theme.breakpoints.down("sm")]: {
        width: theme.spacing(30),
        height: theme.spacing(40),
      }
    },
    image: {
      width: '100%',
      height: theme.spacing(20)
    },
    t: {
      padding: theme.spacing(1)
    }
  })
);
