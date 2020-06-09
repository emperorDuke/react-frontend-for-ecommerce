 import { NextPage, NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { Container } from "next/app";
import Header from "../components/Header";
import CheckOut from "../components/CheckOutPage";
import Footer from "../components/Footer";
import { getCookie } from "../cookie";
import { restoreState } from "../redux/actionCreators/UserAuthActions";
import { orderRequest } from "../redux/actionCreators/OrderActions";
import { urls } from "../service/ApiUrls";
import { userRequest } from "../redux/actionCreators/UserActions";
import { requestAddress } from "../redux/actionCreators/AddressActions";
import { requestPickupLocations } from "../redux/actionCreators/PickupLocations";

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
      ctx.store.dispatch(orderRequest(urls.getOrder(order as string)));
      ctx.store.dispatch(userRequest(urls.getUser(user as string)));
      ctx.store.dispatch(requestAddress(urls.addressBook));
      ctx.store.dispatch(requestPickupLocations(urls.getPickupLocation));
    }
  }
  return {};
};

export default Checkout;
