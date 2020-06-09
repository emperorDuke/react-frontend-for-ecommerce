import { NextPage, NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { restoreState } from "../redux/actionCreators/UserAuthActions";
import { getCookie } from "../cookie";
import { requestCart } from "../redux/actionCreators/CartActions";
import { Container } from "next/app";
import Header from "../components/Header";
import CartSection from "../components/CartSection";
import Footer from "../components/Footer";


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
  if (ctx.isServer) {
    const token = getCookie("token", ctx.req);
    if (token) {
      ctx.store.dispatch(restoreState(token));
      ctx.store.dispatch(requestCart());
    }
  } 

  return {};
};

export default CartPage;
