import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("sm")]: {
        maxWidth: theme.spacing(80)
      }
    },
    variantContainer: {
      display: "flex",
      flexDirection: "row"
    },
    thumb: {
      height: theme.spacing(4),
      width: theme.spacing(6)
    },
    image: {
      height: theme.spacing(9),
      width: theme.spacing(12)
    },
    imageContainer: {
      border: `2px solid ${theme.palette.grey[200]}`,
      padding: "5px",
      borderRadius: theme.shape.borderRadius,
      transition: "border-color 500ms ease-in 30ms",
      "&:hover": {
        borderColor: theme.palette.grey[500]
      }
    },
    spacer: {
      flexGrow: 1
    },
    font: {
      fontSize: theme.typography.fontSize,
      fontFamily: theme.typography.fontFamily,
      textTransform: "capitalize"
    },
    bottomSpacer: {
      flexGrow: 1
    },
    bottomSpacer2: {
      flexBasis: "100px"
    },
    background: {
      backgroundColor: theme.palette.grey[200]
    },
    label: {
      paddingTop: "12px"
    },
    textContainer: {
      padding: "10px 0px 0px 20px"
    },
    thumbContainer: {
      border: `2px solid ${theme.palette.grey[200]}`,
      marginLeft: "5px",
      padding: "3px",
      borderRadius: theme.shape.borderRadius,
      transition: "border-color 500ms ease-in 30ms",
      "&:hover": {
        borderColor: theme.palette.grey[500]
      }
    },
    qtyContainer: {
      padding: "0px 12px 0px 0px",
      marginBottom: "40px"
    },
    toolbarPadding: {
      padding: theme.spacing(1)
    },
    tableContainer: {},
    tableCell: {
      maxWidth: "220px"
    },
    marginRightIcon: {
      marginRight: theme.spacing(1)
    }
  })
);
