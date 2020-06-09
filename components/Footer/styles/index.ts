import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';


export default makeStyles((theme:Theme) => createStyles({
    root:{
        backgroundColor: theme.palette.grey[200],
        maxWidth: theme.spacing(200),
        padding: theme.spacing(10),
    }
}));