import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Rating from "../../Rating";
import Img from "../../Img";
import Link from "../../Link";
import { EnhancedProductType } from "../../../service/Product";
import useStyles from "../styles";
import { useMerchantStore } from "../../../service/MerchantStore";

const ListCard: React.ComponentType<EnhancedProductType> = product => {
  const classes = useStyles();
  const store = useMerchantStore();
  const merchantStore = store.get(product.store);

  return (
    <Card>
      <Link href={product.href} as={product.as} className={classes.linkClass}>
        <Grid container spacing={5}>
          <Grid item>
            <CardActions>
              <Paper className={classes.flag}>
                <Typography variant="subtitle1">50% off</Typography>
              </Paper>
            </CardActions>
          </Grid>
          <Grid item>
            <Img src={product.attachment_1} alt={product.name} />
          </Grid>
          <Grid item zeroMinWidth>
            <Typography variant="h6">{product.name}</Typography>
            <Grid container>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle1">
                      {product.discount_price}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">
                      <s>{product.price}</s>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container direction="column">
                  <Grid item>
                    <Rating rating={product.rating.average_rating} readonly />
                  </Grid>
                  <Grid item>
                    <Typography>
                      {merchantStore && merchantStore.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </Card>
  );
};

export default ListCard;
