import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

interface StyleType {
  width: number;
  height: number;
}

export default makeStyles((theme: Theme) =>
  createStyles({
    activeDot: {
      backgroundImage: `linear-gradient(to right, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
      boxShadow: "-1px 5px 6px",
      transition: "all 500ms ease-in 50ms",
      transitionProperty: "box-shadow, background-color"
    },
    dot: {
      width: (val: StyleType) => `${val.width}px`,
      height: (val: StyleType) => `${val.width}px`,
      marginLeft: theme.spacing(1),
      borderRadius: "50%",
      border: `1px solid ${theme.palette.grey[400]}`
    },
    notActiveDot: {
      backgroundImage: `linear-gradient(to right, ${theme.palette.grey[600]}, ${theme.palette.grey[500]}, white)`,
      boxShadow: "0px 1px 1px",
      "&:hover": {
        cursor: "pointer"
      }
    },
    dotsWrapper: {
      display: "flex",
      flexDirection: "row"
    },
    indicatorWrapper: {
      display: "flex",
      justifyContent: "center",
      position: "absolute",
      width: "100%",
      bottom: "5%"
    }
  })
);
