import { NextPage, NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import axios from "axios";
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
import { apiUrl as path } from "../../services";
import {
  metaSucessful,
  metafailure,
} from "../../redux/actionCreators/ProductMetaActions";
import { getCookie } from "../../cookie";
import { restoreState } from "../../redux/actionCreators/UserAuthActions";
import { makeArray } from "../../utils";
import { TOKEN } from "../../utils/cookieConstants";

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
  const token = getCookie(TOKEN, ctx.req);
  const headers = { "Content-Type": "application/json" };

  if (token) dispatch(restoreState(token));

  const actions = await Promise.all([
    axios
      .get(path("getProduct", ID), { headers })
      .then((res) => productSuccess(makeArray(res.data)))
      .catch((err) => productFailure(err.response.data)),
    axios
      .get(path("getProductAttributes", ID), { headers })
      .then((res) => attributeSuccess(makeArray(res.data)))
      .catch((err) => attributeFailure(err.response.data)),
    axios
      .get(path("getProductMetas", ID), { headers })
      .then((res) => metaSucessful(makeArray(res.data)))
      .catch((err) => metafailure(err.response.data)),
  ]);

  actions.forEach(dispatch);

  return { id: ID };
};

export default ProductPage;
