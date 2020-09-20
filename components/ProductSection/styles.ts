import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";


export default makeStyles((theme:Theme) => createStyles({
    padding: {
        padding: theme.spacing(1),
        height: theme.spacing(30),
    }
}))