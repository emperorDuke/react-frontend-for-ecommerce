import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";






export default makeStyles((theme:Theme) => createStyles({
    container:{
        backgroundColor: theme.palette.grey[100]
    },
    img:{
        width: theme.spacing(80),
        height: theme.spacing(30),
    }

}));