import React from "react";
import withFetch from "../../utils/withFetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import clsx from "classnames";
import useStyles from "./styles";
import { ImgProps } from "./@types";

export * from "./@types";
export * from "./styles";

const Img = withFetch<ImgProps & { innerRef?: any }>((props) => {
  const {
    innerRef,
    isLoading,
    hasLoaded,
    loadingError,
    className,
    ...rest
  } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      {isLoading ? (
        <div
          ref={innerRef}
          {...rest}
          className={clsx(classes.spinner, className)}
        >
          <CircularProgress color="secondary" size="2rem" />
        </div>
      ) : hasLoaded ? (
        <img ref={innerRef} className={className} {...rest} />
      ) : (
        <Typography
          ref={innerRef}
          className={className}
          {...rest}
          variant="subtitle1"
          noWrap
        >
          {props.alt}
        </Typography>
      )}
    </React.Fragment>
  );
});

export default React.forwardRef<HTMLImageElement, ImgProps>((props, ref) => {
  return <Img innerRef={ref} {...props} />;
});
