
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import orange from '@material-ui/core/colors/orange';




export default (theme: Theme) => createStyles({
    starRating: {
        color: orange[500],
        transition: theme.transitions.create('color', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.complex
        }),
        '&:hover': {
            cursor: 'pointer'
        }
    },
    isDisabled: {
        '&:hover': {
            cursor: 'default'
        }
    },
    font:{
        fontSize: theme.typography.fontSize + 5,
    },
    notSelected: {
        color: theme.palette.grey[400]
    }
});