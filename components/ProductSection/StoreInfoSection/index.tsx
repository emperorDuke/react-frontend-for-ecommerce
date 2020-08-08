import React from "react";
import Typography from "@material-ui/core/Typography";
import Label from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import useStyles from "./styles";
import { EnhancedMerchantStore as MerchantStore } from "../../../services";
import Img from "../../Img";

const StoreInfoSection: React.ComponentType<MerchantStore> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={1}>
        {props.logo && (
          <Grid item xs={10}>
            <Img src={props.logo} alt={props.name} className={classes.image} />
          </Grid>
        )}
        <Grid item container spacing={1} alignItems="center">
          <Grid item xs={2}>
            <Label>seller:</Label>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">{props.name}</Typography>
          </Grid>
        </Grid>
        <Grid item container spacing={1} alignItems="center">
          <Grid item xs={2}>
            <Label>rating:</Label>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">
              {props.rating.average_rating}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>{props.verified && <p>Verified</p>}</Grid>
        <Grid item>
          <Typography variant="body2">44 followers</Typography>
        </Grid>
        <Grid item container xs={12} alignItems="center" spacing={1}>
          <Grid item>
            <Button variant="outlined" color="secondary">
              go to store
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary">
              follow
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default StoreInfoSection;
