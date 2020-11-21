import React from "react";
import clsx from "classnames";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

interface Props {
  children: React.ReactNode;
  open: boolean;
  close: boolean;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardWrapper: {
      borderRadius: theme.shape.borderRadius,
      padding: "1px",
      height: "100%",
    },
    notActiveCardWrapper: {
      border: `2px solid transparent`,
    },
    activeCardWrapper: {
      border: `2px solid ${theme.palette.secondary.main}`,
    },
  })
);

export default function Highlighter(props: Props) {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.cardWrapper, {
        [classes.activeCardWrapper]: props.open,
        [classes.notActiveCardWrapper]: props.close,
      })}
    >
      {props.children}
    </div>
  );
}
