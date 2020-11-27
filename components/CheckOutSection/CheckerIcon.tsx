import React from "react";
import clsx from "classnames";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import CheckIcon from "@material-ui/icons/Check";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

interface Props {
  open: boolean;
  close: boolean;
  iconSize?: SvgIconProps["fontSize"];
}

export const styles = (theme: Theme) =>
  createStyles({
    checkIcon: {
      padding: theme.spacing(1),
      borderRadius: "50%",
      width: theme.spacing(3),
      height: theme.spacing(3),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    notChecked: {
      color: theme.palette.grey[300],
      backgroundColor: theme.palette.grey[100],
      border: `2px solid ${theme.palette.grey[200]}`,
    },
    checked: {
      color: "#FFF",
      backgroundColor: theme.palette.success.main,
      border: `2px solid ${theme.palette.grey[300]}`,
    },
  });

export default withStyles(styles)(function Checker({
  iconSize = "small",
  classes,
  ...props
}: Props & WithStyles<typeof styles>) {
  return (
    <div
      className={clsx(classes.checkIcon, {
        [classes.notChecked]: props.close,
        [classes.checked]: props.open,
      })}
    >
      <CheckIcon fontSize={iconSize} />
    </div>
  );
});
