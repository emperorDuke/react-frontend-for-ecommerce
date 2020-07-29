import React from "react";
import withFetch from "../../utils/withFetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { ImgProps } from "./@types";
import useStyles from "./styles";

export * from "./@types";
export * from "./styles";

export default withFetch<ImgProps>((props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {props.isLoading ? (
        <div className={props.className} style={props.style}>
          <CircularProgress color="secondary" size={1} />
        </div>
      ) : props.hasLoaded ? (
        <img
          src={props.item}
          alt={props.alt}
          className={props.className}
          style={props.style}
        />
      ) : (
        <Typography
          variant="subtitle1"
          className={props.className}
          style={props.style}
        >
          {props.alt}
        </Typography>
      )}
    </React.Fragment>
  );
});
