import { NextPage, NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import Header from "../../components/Header";
import ProductSection from "../../components/ProductSection";
import Footer from "../../components/Footer";
import { productRequest } from "../../redux/actionCreators/ProductActions";
import { Container } from "next/app";
import { attributeRequest } from "../../redux/actionCreators/AttributeActions";
import { urls } from "../../service/ApiUrls";
import { metaRequest } from "../../redux/actionCreators/ProductMetaActions";

const ProductPage: NextPage<{ id: string }> = ({ id }) => {

  return (
    <Container>
      <Header />
      <ProductSection id={id} />
      <Footer />
    </Container>
  );
};

ProductPage.getInitialProps = async (ctx: NextPageContext & NextJSContext) => {
  const { id } = ctx.query;
  
  const ID = Array.isArray(id) ? id[0] : id;

  ctx.store.dispatch(productRequest(urls.getProduct(ID)));
  ctx.store.dispatch(attributeRequest(urls.getAttributes(ID)));
  ctx.store.dispatch(metaRequest(urls.getMetas(ID)));

  return { id: ID };
};

export default ProductPage;
