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
import fetch from "../../utils/Fetch";
import { apiUrl } from "../../services";

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

  await fetch(
    dispatch,
    { success: productSuccess, failure: productFailure },
    apiUrl("getProducts") + `?category=${ID}`
  );

  await fetch(
    dispatch,
    { success: filterSuccess, failure: filterFailure },
    apiUrl("getFilters", ID)
  );

  await fetch(
    dispatch,
    { success: categorySuccess, failure: categoryFailure },
    apiUrl("getCategories")
  );
  return { ID };
};

export default CategoryPage;
