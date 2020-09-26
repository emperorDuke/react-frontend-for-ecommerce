import React from "react";
import { NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import axios from "axios";
import { Container } from "next/app";
import HomeMainSection from "../components/HomeSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { apiUrl as path } from "../services";
import {
  storeSuccess,
  storeFailure,
} from "../redux/actionCreators/StoreActions";
import {
  carouselSuccess,
  carouselFailure,
} from "../redux/actionCreators/CarouselActions";
import {
  listingSuccessful,
  listingRequestFailed,
} from "../redux/actionCreators/ProductListingActions";
import {
  sponsoredProductSuccess,
  sponsoredProductFailed,
  sponsoredStoreSuccess,
  sponsoredStoreFailure,
} from "../redux/actionCreators/SponsoredActions";
import { getCookie } from "../cookie";
import { restoreState } from "../redux/actionCreators/UserAuthActions";
import { makeArray } from "../utils";
import { TOKEN } from "../utils/cookieConstants";

class Index extends React.Component {
  static async getInitialProps(ctx: NextPageContext & NextJSContext) {
    const dispatch = ctx.store.dispatch;
    const token = getCookie(TOKEN, ctx.req);
    const headers = { "Content-Type": "application/json" };

    if (token) restoreState(token);

    const actions = await Promise.all([
      axios
        .get(path("getMerchantStores"), { headers })
        .then((res) => storeSuccess(makeArray(res.data)))
        .catch((err) => storeFailure(err.response.data)),
      axios
        .get(path("getInternalAds"), { headers })
        .then((res) => carouselSuccess(makeArray(res.data)))
        .catch((err) => carouselFailure(err.response.data)),
      axios
        .get(path("getListings"), { headers })
        .then((res) => listingSuccessful(makeArray(res.data)))
        .catch((err) => listingRequestFailed(err.response.data)),
      axios
        .get(path("getSponsoredProducts"), { headers })
        .then((res) => sponsoredProductSuccess(makeArray(res.data)))
        .catch((err) => sponsoredProductFailed(err.response.data)),
      axios
        .get(path("getSponsoredStores"), { headers })
        .then((res) => sponsoredStoreSuccess(makeArray(res.data)))
        .catch((err) => sponsoredStoreFailure(err.response.data)),
    ]);

    actions.forEach(dispatch);

    return {};
  }

  render() {
    return (
      <Container>
        <Header disableCategoryButton />
        <HomeMainSection />
        <Footer />
      </Container>
    );
  }
}

export default Index;
