import Slider from "@material-ui/core/Slider";
import withStyles from "@material-ui/core/styles/withStyles";
import grey from "@material-ui/core/colors/grey";


export default withStyles({
    root:{
        color: grey[500],
        height: 3,
        padding: '13px 0'
    },
    thumb:{
        height: 27,
        width: 27,
        top: 5,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        boxShadow: '#ebebeb 0px 2px 2px',
        '&:focus, &:hover, &$active':  {
            boxShadow: '#ccc 0px 2px 3px 1px'
        },
    },
    active: {},
    track: {
        height: 3
    },
    rail: {
        color: '#d8d8d8',
        opacity: 1,
        height: 3
    }
})(Slider);