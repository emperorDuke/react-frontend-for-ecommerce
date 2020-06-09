import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { CurrentManagerStyleProps } from "../@types";



export default makeStyles((theme:Theme) => createStyles({
    font: {
        fontSize: ({customSize}:CurrentManagerStyleProps) => theme.typography.fontSize + customSize
    }
}));