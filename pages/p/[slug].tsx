import { NextPage, NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import Header from "../../components/Header";
import ProductSection from "../../components/ProductSection";
import Footer from "../../components/Footer";
import { productRequest } from "../../redux/actionCreators/ProductActions";
import { Container } from "next/app";
import { attributeRequest } from "../../redux/actionCreators/AttributeActions";
import { apiUrl } from "../../services";
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

  ctx.store.dispatch(productRequest(apiUrl("getProduct", ID)));
  ctx.store.dispatch(attributeRequest(apiUrl("getProductAttributes", ID)));
  ctx.store.dispatch(metaRequest(apiUrl("getProductMetas", ID)));

  return { id: ID };
};

export default ProductPage;
