 import { NextPage, NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { Container } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCookie } from "../cookie";
import { restoreState } from "../redux/actionCreators/UserAuthActions";
import { orderRequest } from "../redux/actionCreators/OrderActions";
import { apiUrl } from "../services";
import { userRequest } from "../redux/actionCreators/UserActions";
import { requestAddress } from "../redux/actionCreators/AddressActions/AddressActions";
import { requestPickupLocations } from "../redux/actionCreators/PickupLocations";
import CheckOut from "../components/CheckOutPage/CheckOut";

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
    if (token) {
      ctx.store.dispatch(restoreState(token));
      ctx.store.dispatch(orderRequest(apiUrl("getOrder", order as string)));
      ctx.store.dispatch(userRequest(apiUrl("getUser", user as string)));
      ctx.store.dispatch(requestAddress(apiUrl("addressBook")));
      ctx.store.dispatch(requestPickupLocations(apiUrl("getPickupLocation")));
    }
  }
  return {};
};

export default Checkout;
