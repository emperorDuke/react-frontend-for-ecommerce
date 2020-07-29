import React from "react";
import { NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { Container } from "next/app";
import HomeMainSection from "../components/HomeSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import fetch from "../utils/Fetch";
import { apiUrl } from "../services";
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

class Index extends React.Component {
  static async getInitialProps({ store }: NextPageContext & NextJSContext) {

    await fetch(
      store.dispatch,
      { success: storeSuccess, failure: storeFailure },
      apiUrl("getMerchantStores")
    );

    await fetch(
      store.dispatch,
      { success: carouselSuccess, failure: carouselFailure },
      apiUrl("getInternalAds")
    );

    await fetch(
      store.dispatch,
      { success: listingSuccessful, failure: listingRequestFailed },
      apiUrl("getListings")
    );

    await fetch(
      store.dispatch,
      { success: sponsoredProductSuccess, failure: sponsoredProductFailed },
      apiUrl("getSponsoredProducts")
    );

    await fetch(
      store.dispatch,
      { success: sponsoredStoreSuccess, failure: sponsoredStoreFailure },
      apiUrl("getSponsoredStores")
    );

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
