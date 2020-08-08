import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

interface StyleType {
  height: number;
}

export default makeStyles((theme: Theme) =>
  createStyles({
    qtyInput: {
      ...theme.typography.body1,
      border: `1px solid ${theme.palette.grey[400]}`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "#FFF",
    },
    btn: {
      ...theme.typography.button
    },
    input: {
      border: "none",
      padding: "5px",
      textAlign: "center",
      height: (val: StyleType ) => `${val.height}px`
    },
  })
);
