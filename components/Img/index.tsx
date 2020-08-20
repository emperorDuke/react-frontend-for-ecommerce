import React from "react";
import withFetch from "../../utils/withFetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { ImgProps } from "./@types"

export * from "./@types";
export * from "./styles";

const Img = withFetch<ImgProps & { innerRef?: any }>((props) => {
  const { innerRef, isLoading, hasLoaded, loadingError, ...rest } = props;

  return (
    <React.Fragment>
      {isLoading ? (
        <div ref={innerRef} {...rest}>
          <CircularProgress color="secondary" size={4} />
        </div>
      ) : hasLoaded ? (
        <img ref={innerRef} {...rest} />
      ) : (
        <Typography ref={innerRef} {...rest} variant="subtitle1" noWrap>
          {props.alt}
        </Typography>
      )}
    </React.Fragment>
  );
});

export default React.forwardRef<HTMLImageElement, ImgProps>((props, ref) => {
  return <Img innerRef={ref} {...props} />;
});
