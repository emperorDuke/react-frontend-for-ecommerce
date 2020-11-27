import React from "react";
import Grid from "@material-ui/core/Grid";
import useSelector from "../../../redux/utils/useStoreSelector";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderSummary: {
      height: theme.spacing(50),
      padding: theme.spacing(1),
    },
  })
);

export default function Orders() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <Paper className={classes.orderSummary}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div>Shirts</div>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
