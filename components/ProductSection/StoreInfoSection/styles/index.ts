import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import {Theme} from '@material-ui/core/styles/createMuiTheme';



export default makeStyles((theme:Theme) => createStyles({
    root: {
        padding: theme.spacing(2)
    },
    text:{
        fontSize: theme.typography.fontSize
    }
}));