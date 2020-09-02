import { NextPage, NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { Container } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCookie } from "../cookie";
import { restoreState } from "../redux/actionCreators/UserAuthActions";
import {
  orderSuccess,
  orderFailed,
} from "../redux/actionCreators/OrderActions";
import { apiUrl as path } from "../services";
import { userSuccesful, userFailed } from "../redux/actionCreators/UserActions";
import {
  addressSuccessful,
  addressFailed,
} from "../redux/actionCreators/AddressActions/AddressActions";
import {
  pickUpLocationSuccessful,
  pickUpLocationFailed,
} from "../redux/actionCreators/PickupLocations";
import CheckOut from "../components/CheckOutPage/CheckOut";
import axiosClient from "../axios-client";

const Checkout: NextPage = () => {
  return (
    <Container>
      <Header />
      <CheckOut />
      <Footer />
    </Container>
  );
};

Checkout.getInitialProps = async (ctx: NextPageContext & NextJSContext) => {
  const { user, order } = ctx.query;

  if (ctx.isServer) {
    const token = getCookie("token", ctx.req);
    const dispatch = ctx.store.dispatch;

    if (token) { 
      const axios = axiosClient(token);
      const responses = await Promise.all([
        axios
          .get(path("getOrder", order as string))
          .then((response) => orderSuccess(response.data))
          .catch((error) => orderFailed(error.response.data)),
        axios
          .get(path("addressBook"))
          .then((response) => addressSuccessful(response.data))
          .catch((error) => addressFailed(error.response.data)),
        axios
          .get(path("getBuyer", user as string))
          .then((response) => userSuccesful(response.data))
          .catch((error) => userFailed(error.response.data)),
        axios
          .get(path("getPickupLocation"))
          .then((response) => pickUpLocationSuccessful(response.data))
          .catch((error) => pickUpLocationFailed(error.response.data)),
      ]);

      responses.forEach((response) => {
        dispatch(response);
      });

      dispatch(restoreState(token));
    }
  }
  return {};
};

export default Checkout;
