import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import useSelector from "../../redux/utils/useStoreSelector";
import { useUser } from "../../services";
import { useRouter } from "next/router";
import { post } from "../../redux/actionCreators/PostActions";
import { orderSuccess } from "../../redux/actionCreators/OrderActions";
import DeliveryMethod from "./DeliveryMethod";
import AddressSection from "./AddressSection";

type PaymentMethod = "Pay now" | "Pay on Delivery";

function CheckOut() {
  const router = useRouter();
  const [postingState, setPostingState] = useState({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Pay now");
  const buyer = useUser("buyer");
  const dispatch = useDispatch();

  const incomingPosts = useSelector(({ posts }) => posts);

  useEffect(() => {
    if (incomingPosts.operations.postItem.status === post.POST_ITEM) {
      setPostingState({
        error: null,
        loading: true,
        hasLoaded: false,
        data: null
      });
    } else if (
      incomingPosts.operations.postItem.status === post.POST_SUCCESSFUL
    ) {
      dispatch(orderSuccess(incomingPosts.sucessMessage));
      setPostingState({
        error: null,
        loading: false,
        hasLoaded: true,
        data: incomingPosts.sucessMessage
      });
    } else if (
      incomingPosts.operations.postItem.status === post.POSTING_FAILED
    ) {
      setPostingState({
        error: incomingPosts.operations.postItem.responseError,
        loading: false,
        hasLoaded: true,
        data: null
      });
    }
  }, [incomingPosts]);

  return (
    <div>
      <h1>CHECK OUT PAGE IS UNAVAILABLE</h1>
      <Grid container spacing={1} direction="row">
        {/**Orders and Checkout details */}
        <Grid item>
          <Grid container spacing={1} direction="column">
            <Grid item>
              <AddressSection />
            </Grid>
            <Grid item>
              <DeliveryMethod />
            </Grid>
            {/**Payment methods */}
            <Grid item>
              <Paper>
                <Typography>Payment method</Typography>
                <Divider />
                <Grid container direction="column">
                  <Grid item>
                    <FormControlLabel
                      control={<Radio />}
                      value={paymentMethod}
                      onChange={() => setPaymentMethod("Pay now")}
                      label={<Typography variant="h6">Pay now</Typography>}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item>
                        <FormControlLabel
                          control={<Radio />}
                          value={paymentMethod}
                          onChange={() => setPaymentMethod("Pay on Delivery")}
                          label={
                            <Typography variant="h6">
                              Pay on delivery
                            </Typography>
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {/**Ordered items */}
        <Grid item>
          <Grid container direction="column">
            {buyer.orders && buyer.orders.all()[0].items.map(item => (
              <Grid item>{item.name}</Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CheckOut;
