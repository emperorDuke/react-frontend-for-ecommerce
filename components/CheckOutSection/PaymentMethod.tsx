import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

type PaymentMethod = "Pay now" | "Pay on Delivery";

function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Pay now");

  return (
    <Paper>
      <Typography>Payment method</Typography>
      <Divider />
      <Grid container direction="column">
        <Grid item>
          <FormControlLabel
            control={<Radio />}
            value={paymentMethod}
            onChange={() => setPaymentMethod("Pay now")}
            label={<Typography variant="subtitle1">Pay now</Typography>}
          />
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <FormControlLabel
                control={<Radio />}
                value={paymentMethod}
                onChange={() => setPaymentMethod("Pay on Delivery")}
                label={<Typography variant="subtitle1">Pay on delivery</Typography>}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PaymentMethod;
