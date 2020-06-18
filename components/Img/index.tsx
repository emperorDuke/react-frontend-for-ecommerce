import React from "react";
import withFetch from "../../utils/withFetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { ImgProps } from "./@types";
import useStyles from "./styles";

export * from "./@types";
export * from "./styles";

export default withFetch<ImgProps>(props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {props.isLoading ? (
        <CircularProgress color="secondary" className={classes.spinner} />
      ) : props.hasLoaded ? (
        <img src={props.item} alt={props.alt} className={props.className} />
      ) : (
        <Typography variant="subtitle1" className={props.className}>
          {props.alt}
        </Typography>
      )}
    </React.Fragment>
  );
});
