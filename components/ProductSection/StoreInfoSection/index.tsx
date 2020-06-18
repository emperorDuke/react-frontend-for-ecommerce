import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import { EnhancedMerchantStore } from "../../../services";

interface PropsType {
  store: EnhancedMerchantStore
}

const StoreInfoSection: React.ComponentType<PropsType> = props => {
  const classes = useStyles();

  let rateData: Array<JSX.Element> = [];
  let logo: JSX.Element | undefined | "";

  const storeData = Object.keys(props.store)
    .filter(key => key !== "adverts")
    .map(storeKey => {
      let tag;

      if (storeKey !== "logo" && storeKey !== "link" && storeKey !== "id") {
        if (storeKey === "rating") {
          rateData = Object.keys(props.store[storeKey]).map(ratingKey => {
            return (
              <React.Fragment key={ratingKey}>
                <Grid item sm={5} xs={5}>
                  <InputLabel className={classes.text}>
                    {ratingKey
                      .slice()
                      .replace("n_", "no_of_")
                      .split("_")
                      .join(" ")}
                    :
                  </InputLabel>
                </Grid>
                <Grid item sm={6} xs={6}>
                  <Typography component="p" className={classes.text}>
                    {props.store[storeKey][ratingKey]}
                  </Typography>
                </Grid>
              </React.Fragment>
            );
          });
        } else {
          tag = props.store[storeKey] && (
            <React.Fragment key={storeKey}>
              <Grid item sm={5} xs={5}>
                <InputLabel className={classes.text}>{storeKey}:</InputLabel>
              </Grid>
              <Grid item sm={6} xs={6}>
                <Typography component="p" className={classes.text}>
                  {props.store[storeKey]}
                </Typography>
              </Grid>
            </React.Fragment>
          );
        }
      } else {
        if (storeKey === "logo") {
          logo = props.store[storeKey] && (
            <img
              key={storeKey}
              src={props.store[storeKey]}
              alt={storeKey}
            />
          );
        }
      }

      return tag;
    });

  return (
    <Paper className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h3">STORE</Typography>
        </Grid>
        {logo && <Grid item>{logo}</Grid>}
        <Grid item>
          <Grid container spacing={2}>
            {storeData}
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
          <Grid container spacing={2}>
            {rateData}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StoreInfoSection;
