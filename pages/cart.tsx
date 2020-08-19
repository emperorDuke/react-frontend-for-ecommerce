import { NextPage, NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { restoreState } from "../redux/actionCreators/UserAuthActions";
import { getCookie } from "../cookie";
import {
  cartRequestSuccessful,
  cartRequestFailed,
} from "../redux/actionCreators/CartActions";
import { Container } from "next/app";
import Header from "../components/Header";
import CartSection from "../components/CartSection";
import Footer from "../components/Footer";
import { apiUrl } from "../services";
import { BEARER } from "../redux/utils/bearer-constant";
import axios from "axios";

const CartPage: NextPage = () => {
  return (
    <Container>
      <Header />
      <CartSection />
      <Footer />
    </Container>
  );
};

CartPage.getInitialProps = async (ctx: NextPageContext & NextJSContext) => {
  const dispatch = ctx.store.dispatch;

  if (ctx.isServer) {
    const token = getCookie("token", ctx.req);
    if (token) {
      dispatch(restoreState(token));
      
      try {
        const response = await axios({
          url: apiUrl("getCarts"),
          method: "get",
          headers: {
            Authorization: `${BEARER} ${token}`,
            "Content-Type": "application/json",
          },
        });
        dispatch(cartRequestSuccessful(response.data));
      } catch (error) {
        dispatch(cartRequestFailed(error.response.data));
      }
    }
  }

  return {};
};

export default CartPage;
