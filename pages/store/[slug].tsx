import { NextPage, NextPageContext } from "next";
import { Container } from "next/app";
import { NextJSContext } from "next-redux-wrapper";
import { storeRequest } from "../../redux/actionCreators/StoreActions";
import { productRequest } from "../../redux/actionCreators/ProductActions";
import Header from "../../components/Header";
import StoreSection from "../../components/StoreSection";
import Footer from "../../components/Footer";
import { urls } from "../../service/ApiUrls";

const Store: NextPage<{storeId: string}> = props => {
  return (
    <Container>
      <Header />
      <StoreSection storeId={props.storeId}/>
      <Footer />
    </Container>
  );
};

Store.getInitialProps = async ({
  store,
  query
}: NextJSContext & NextPageContext) => {
  const ID = Array.isArray(query.storeId) ? query.storeId[0] : query.storeId;

  store.dispatch(storeRequest(urls.getMerchantStore(ID)));
  store.dispatch(productRequest(urls.getProduct(ID)));

  return {storeId: ID};
};

export default Store;
