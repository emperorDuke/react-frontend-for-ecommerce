import React from "react";
import { NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { Container } from "next/app";
import HomeMainSection from "../components/HomeSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import fetch from "../service/Fetch";
import { urls } from "../service/ApiUrls";
import {
  productSuccess,
  productFailure,
} from "../redux/actionCreators/ProductActions";
import {
  storeSuccess,
  storeFailure,
} from "../redux/actionCreators/StoreActions";
import {
  carouselSuccess,
  carouselFailure,
} from "../redux/actionCreators/CarouselActions";

class Index extends React.Component {
  static async getInitialProps({ store }: NextPageContext & NextJSContext) {
    await fetch(
      store.dispatch,
      { success: productSuccess, failure: productFailure },
      urls.products
    );

    await fetch(
      store.dispatch,
      { success: storeSuccess, failure: storeFailure },
      urls.merchantStores
    );

    await fetch(
      store.dispatch,
      { success: carouselSuccess, failure: carouselFailure },
      urls.internalAds
    );
    return {};
  }

  render() {
    return (
      <Container>
        <Header disableCategoryButton/>
        <HomeMainSection />
        <Footer />
      </Container>
    );
  }
}

export default Index;
