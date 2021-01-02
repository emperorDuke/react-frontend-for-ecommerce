import React from "react";
import Grid from "@material-ui/core/Grid";
import useSelector from "../../../redux/utils/useStoreSelector";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Img from "../../Img";
import { useProduct } from "../../../services";
import CurrencyManager from "../../CurrencyManager";

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
  const cart = useSelector(({ cart }) => cart.cart);
  const product = useProduct();

  const orders = cart.map((item) => {
    const _product = product.get(item.product);

    if (_product) {
      return (
        <Grid item container key={item.id}>
          <Grid item xs={4}>
            <Img src={_product.attachment_1} alt={_product.name} />
          </Grid>
          <Grid item xs={6} container>
            <Grid item xs={12}>
              <Typography variant="body2" component="span">
                {_product.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" component="span">
                qty: {item.quantity}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" component="span">
              <CurrencyManager price={item.price} />
            </Typography>
          </Grid>
        </Grid>
      );
    }

    return <React.Fragment key={item.id}></React.Fragment>;
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom component="h4">
        Order Summary
      </Typography>
      <Paper className={classes.orderSummary}>
        <Grid container spacing={1}>
          {orders}
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
