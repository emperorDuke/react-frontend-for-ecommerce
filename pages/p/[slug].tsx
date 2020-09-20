import { NextPage, NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import Header from "../../components/Header";
import ProductSection from "../../components/ProductSection";
import Footer from "../../components/Footer";
import {
  productSuccess,
  productFailure,
} from "../../redux/actionCreators/ProductActions";
import { Container } from "next/app";
import {
  attributeSuccess,
  attributeFailure,
} from "../../redux/actionCreators/AttributeActions";
import { apiUrl } from "../../services";
import {
  metaSucessful,
  metafailure,
} from "../../redux/actionCreators/ProductMetaActions";
import fetch from "../../utils/Fetch";
import { getCookie } from "../../cookie";
import { restoreState } from "../../redux/actionCreators/UserAuthActions";

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
  const dispatch = ctx.store.dispatch;
  const token = getCookie("token", ctx.req);

  if (token) dispatch(restoreState(token));

  await Promise.all([
    fetch(
      dispatch,
      { success: productSuccess, failure: productFailure },
      apiUrl("getProduct", ID)
    ),
    fetch(
      dispatch,
      { success: attributeSuccess, failure: attributeFailure },
      apiUrl("getProductAttributes", ID)
    ),
    fetch(
      dispatch,
      { success: metaSucessful, failure: metafailure },
      apiUrl("getProductMetas", ID)
    ),
  ]);

  return { id: ID };
};

export default ProductPage;
