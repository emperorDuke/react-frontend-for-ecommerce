import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export default makeStyles((theme: Theme) =>
  createStyles({
    qtyInput: {
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: theme.shape.borderRadius,
      fontSize: theme.typography.fontSize,
      paddingRight: "0px",
      backgroundColor: "#FFF",
    },
    rightQtyBtn: {
      fontSize: theme.typography.fontSize + 2,
    },
    leftQtyBtn: {
      fontSize: theme.typography.fontSize + 2,
    },
    input: {
      width: "20px",
      border: "none",
      padding: "5px",
      textAlign: "center",
      height: "20px",
    },
  })
);
