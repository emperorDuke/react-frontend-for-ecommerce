import {Theme} from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';




export default makeStyles((theme:Theme) => createStyles({
    appBar:{
        backgroundColor: theme.palette.background.paper,
    },
    cartBtn:{
        fontSize: theme.typography.fontSize * 2,
    },
    cartDiv:{
        padding: theme.spacing(4),
    },
    badge:{
        fontSize: theme.typography.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
        top: '50%',
        right: 2,
        border: `2px solid ${theme.palette.grey[200]}`
    },
    font:{
        fontSize: theme.typography.fontSize,
    },
    menuIcon:{
        fontSize: theme.typography.fontSize + 5,
        marginRight: theme.spacing(1)
    },
    DropDownIcon:{
        fontSize: theme.typography.fontSize + 5,
        marginLeft: theme.spacing(1)
    },
    subHeader_2:{
        backgroundColor: theme.palette.grey[200],
    },
    image: {
        width: theme.spacing(30)
    }
}));