import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export default makeStyles(() => createStyles({
    label: {
        textTransform: "capitalize"
    }
}))