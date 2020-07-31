import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Label from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import { EnhancedMerchantStore as MerchantStore } from "../../../services";
import Img from "../../Img";
import Link from "../../Link";

const StoreInfoSection: React.ComponentType<MerchantStore> = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Link href={props.href} as={props.as}>
        <Grid container direction="column" spacing={2}>
          {props.logo && (
            <Grid item>
              <Img src={props.logo} alt={props.name} />
            </Grid>
          )}
          <Grid item container spacing={1} alignItems="center">
            <Grid item lg={2} md={2}>
              <Label>seller:</Label>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{props.name}</Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={1} alignItems="center">
            <Grid item lg={2} md={2}>
              <Label>rating:</Label>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {props.rating.average_rating}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container>
            {props.verified && (
              <Grid item>
                <p>Verified</p>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Link>
    </Paper>
  );
};

export default StoreInfoSection;
