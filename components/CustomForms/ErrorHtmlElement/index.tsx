import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import classNames from "classnames";
import createStyles from "@material-ui/core/styles/createStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootContainer: {
      position: "relative",
      left: "102%",
      top: "50px"
    },
    root: {
      color: theme.palette.error.main,
      position: "absolute",
      fontFamily: theme.typography.fontFamily
    }
  })
);

interface ErrorTagProps {
  errorMessage?: string;
  className?: string;
  classes?: {
    [key: string]: string | undefined;
    rootContainer?: string;
    root?: string;
  };
}

const getClasses = (
  classes: ErrorTagProps["classes"],
  key: "rootContainer" | "root"
) => (classes ? classes[key] : undefined);

const ErrorHtmlTag: React.ComponentType<ErrorTagProps> = ({
  errorMessage,
  classes,
  className
}) => {
  const { rootContainer, root } = useStyles();

  return (
    <div
      className={
        rootContainer ? rootContainer : getClasses(classes, "rootContainer")
      }
    >
      <small
        className={classNames(
          root ? root : getClasses(classes, "root"),
          className
        )}
      >
        {errorMessage}
      </small>
    </div>
  );
};

export default ErrorHtmlTag;
