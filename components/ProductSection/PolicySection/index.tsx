import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import LocalShippingIcon from "@material-ui/icons/LocalShippingOutlined";

const PolicySection = () => {
  return (
    <div style={{ padding: "8px" , flexGrow: 1 }}>
      <Grid container spacing={1} direction="column">
        <Grid item container xs={12}>
          <Grid item sm={3} md={3} lg={3}>
            <Typography variant="subtitle2">Return policy:</Typography>
          </Grid>
          <Grid item md lg>
            <Typography variant="body2">
              Return accepted if product is not as described, buuyer pays return
              shipping fee or keep the product and agree refun with the seller
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item sm={3} md={3} lg={3}>
            <Typography variant="subtitle2">Seller guarantees:</Typography>
          </Grid>
          <Grid item container spacing={1} md lg>
            <Grid item>
              <LocalShippingIcon />
            </Grid>
            <Grid item>
              <Typography variant="body2">
                one-time delivery within two working days
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item sm={3} md={3} lg={3}>
            <Typography variant="subtitle2">Store promotions:</Typography>
          </Grid>
          <Grid item md lg>
            <Typography variant="body2">
              when you buy twenty pieces you get a discount of 30%
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item sm={3} md={3} lg={3}>
            <Typography variant="subtitle2">Payments:</Typography>
          </Grid>
          <Grid item>
            <img src="/static/cards.png" alt="cards" />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PolicySection;
