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
  categoryRequest,
  categorySuccess,
  categoryFailure,
} from "../../redux/actionCreators/CategoryActions";
import fetch from "../../utils/Fetch";
import { apiUrl } from "../../services";

type Props = {
  id: string | string[];
};

const CategoryPage: NextPage<Props> = ({ id }) => {
  const ID = id instanceof Array ? undefined : id;

  return (
    <Container>
      <Header />
      <CategorySection trackId={ID} />
      <Footer />
    </Container>
  );
};

CategoryPage.getInitialProps = async ({
  store,
  query,
}: NextPageContext & NextJSContext) => {
  const { id } = query;
  const dispatch = store.dispatch;

  await fetch(
    dispatch,
    { success: productSuccess, failure: productFailure },
    apiUrl("getProducts") + `?category=${id}`
  );

  await fetch(
    dispatch,
    { success: filterSuccess, failure: filterFailure },
    apiUrl("getFilters", id[0])
  );

  await fetch(
    dispatch,
    { success: categorySuccess, failure: categoryFailure },
    apiUrl("getCategories")
  );
  return { id };
};

export default CategoryPage;
