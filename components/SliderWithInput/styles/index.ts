import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";




export default makeStyles((theme:Theme) => createStyles({
    btn:{
        marginLeft: theme.spacing(1)
    },
}));