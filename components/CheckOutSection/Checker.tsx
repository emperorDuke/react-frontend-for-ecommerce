import React from "react";
import clsx from "classnames";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import CheckIcon from "@material-ui/icons/Check";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

interface Props {
  open: boolean;
  close: boolean;
  iconSize?: "small" | "large" | "default" | "inherit";
}

export const useStyles = makeStyles((theme: Theme) =>
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
      display: "none",
    },
    checked: {
      color: "#FFF",
      backgroundColor: theme.palette.success.main,
      border: `2px solid ${theme.palette.grey[300]}`,
    },
  })
);

export default function Checker({ iconSize = "small", ...props }: Props) {
  const classes = useStyles();

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
}
