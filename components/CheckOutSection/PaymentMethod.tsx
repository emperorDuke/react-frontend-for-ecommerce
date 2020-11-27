import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

type Payment = "Pay now" | "Pay on Delivery";

function PaymentMethod() {
  const [paymentType, setPaymentType] = useState<Payment>("Pay now");

  return (
    <div>
      <Typography>Payment method</Typography>
      <Divider />
      <Grid container direction="column">
        <Grid item>
          <FormControlLabel
            control={<Radio />}
            value={paymentType}
            onChange={() => setPaymentType("Pay now")}
            label={<Typography variant="subtitle1">Pay now</Typography>}
          />
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <FormControlLabel
                control={<Radio />}
                value={paymentType}
                onChange={() => setPaymentType("Pay on Delivery")}
                label={<Typography variant="subtitle1">Pay on delivery</Typography>}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default PaymentMethod;
