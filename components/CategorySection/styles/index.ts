import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";



export default makeStyles((theme: Theme) => createStyles({
    layout:{
        width: theme.spacing(30),
        padding: theme.spacing(1)
    }
}));