import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";






export default makeStyles((theme: Theme) => createStyles({
    root: {
        margin: theme.spacing(2)
    },
    imageContainer: {
        position: "relative",
        left: "50%",
        boxSizing: "border-box",
        padding: theme.spacing(2, 0, 0, 0)
    },
    image: {
        height: theme.spacing(10),
        width: theme.spacing(10),
        position: "absolute",
        bottom: "8%",
    },
    fontSize: {
        fontSize: theme.typography.fontSize,
        fontFamily: theme.typography.fontFamily,
    },
    input: {
        width: "inherit",
        height: "inherit"
    },
    btnContainer: {
        maxWidth: "50px",
        position: "relative",
        left: "80%",
        top: "15%"
    },
    trashBtn: {
        position: "absolute",
        bottom: "8%",
        margin: theme.spacing(0, 0, 2, 0)
    }
}));