import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { pink } from "@material-ui/core/colors";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    variantContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap"
    },
    image: {
      height: "100%",
      width: "100%"
    },
    imageContainer: {
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(1),
      border: `1px solid ${pink[200]}`,
      borderRadius: theme.shape.borderRadius,
      transition: "border-color 500ms ease-in 30ms",
      width: "100%",
      height: "100%",
      "&:hover": {
        cursor: "pointer",
        borderColor: theme.palette.secondary.light
      }
    },
    spacer: {
      flexGrow: 1
    },
    font: {
      ...theme.typography.subtitle2,
      textTransform: "capitalize"
    },
    bottomSpacer: {
      flexGrow: 1
    },
    bottomSpacer2: {
      flexBasis: "100px"
    },
    background: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText
    },
    toolbarPadding: {
      padding: theme.spacing(1)
    },
  })
);
