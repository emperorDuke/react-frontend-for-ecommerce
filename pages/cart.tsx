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
import { apiUrl as path } from "../services";
import { dependencies } from "../redux/epics/CartEpics";
import Axios from "axios-observable";
import { BEARER } from "../redux/utils/constants";
import { map, exhaustMap, takeWhile, toArray } from "rxjs/operators";
import { of, merge } from "rxjs";

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
  const token = getCookie("token", ctx.req);

  if (token) {
    dispatch(restoreState(token));
    try {
      const actions = await Axios.get(path("getCarts"), {
        headers: {
          Authorization: `${BEARER} ${token}`,
          "Content-Type": "application/json",
        },
      })
        .pipe(
          map(({ data: cart }) => cart),
          takeWhile((cart) => !!cart.length),
          exhaustMap((cart) =>
            merge(of(cartRequestSuccessful(cart)), dependencies(cart, Axios))
          ),
          toArray()
        )
        .toPromise();

      actions.forEach((action) => dispatch(action));
    } catch (error) {
      dispatch(cartRequestFailed(error.response.data));
    }
  }

  return {};
};

export default CartPage;
