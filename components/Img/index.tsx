import React from "react";
import withFetch from "../../utils/withFetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { ImgProps } from "./@types"

export * from "./@types";
export * from "./styles";

const Img = withFetch<ImgProps & { innerRef?: any }>((props) => {
  const { innerRef, ...rest } = props;

  return (
    <React.Fragment>
      {props.isLoading ? (
        <div ref={innerRef} {...rest}>
          <CircularProgress color="secondary" size={2} />
        </div>
      ) : props.hasLoaded ? (
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
