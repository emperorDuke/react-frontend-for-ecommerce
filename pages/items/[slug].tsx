import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CategorySection from "../../components/CategorySection";
import { Container } from "next/app";
import { NextPage, NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import {
  productSuccess,
  productFailure,
} from "../../redux/actionCreators/ProductActions";
import {
  filterSuccess,
  filterFailure,
} from "../../redux/actionCreators/FilterActions";
import {
  categorySuccess,
  categoryFailure,
} from "../../redux/actionCreators/CategoryActions";
import axios from "axios";
import { apiUrl as path } from "../../services";
import { makeArray } from "../../utils";

type Props = {
  ID: string;
};

const CategoryPage: NextPage<Props> = ({ ID }) => {
  return (
    <Container>
      <Header />
      <CategorySection trackId={ID} />
      <Footer />
    </Container>
  );
};

CategoryPage.getInitialProps = async (ctx: NextPageContext & NextJSContext) => {
  const { id } = ctx.query;
  const ID = Array.isArray(id) ? id[0] : id;
  const dispatch = ctx.store.dispatch;
  const headers = { "Content-Type": "application/json" };

  const actions = await Promise.all([
    axios
      .get(path("getProducts") + `?category=${ID}`, { headers })
      .then((res) => productSuccess(makeArray(res.data)))
      .catch((err) => productFailure(err.response.data)),
    axios
      .get(path("getFilters", ID), { headers })
      .then((res) => filterSuccess(makeArray(res.data)))
      .catch((err) => filterFailure(err.response.data)),
    axios
      .get(path("getCategories"), { headers })
      .then((res) => categorySuccess(makeArray(res.data)))
      .catch((err) => categoryFailure(err.response.data)),
  ]);

  actions.forEach(dispatch);

  return { ID };
};

export default CategoryPage;
