import React from "react";
import withFetch from "../../utils/withFetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { ImgProps } from "./@types";
import useStyles from "./styles";

export * from "./@types";
export * from "./styles";

const Img =  withFetch<ImgProps & { ref?: any }>((props) => {

  return (
    <React.Fragment>
      {props.isLoading ? (
        <div {...props}>
          <CircularProgress color="secondary" size={2} />
        </div>
      ) : props.hasLoaded ? (
        <img {...props} />
      ) : (
        <Typography {...props} variant="subtitle1" noWrap>
          {props.alt}
        </Typography>
      )}
    </React.Fragment>
  );
});

export default React.forwardRef<HTMLImageElement, ImgProps>((props, ref) => {
  return <Img ref={ref} {...props} />
})
