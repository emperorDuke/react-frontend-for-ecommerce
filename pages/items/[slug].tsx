import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CategorySection from "../../components/CategorySection";
import { Container } from "next/app";
import { NextPage, NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { productRequest } from "../../redux/actionCreators/ProductActions";
import { filterRequest } from "../../redux/actionCreators/FilterActions";
import { categoryRequest } from "../../redux/actionCreators/CategoryActions";


type Props = {
    category_trackID: string | string[];
}

const CategoryPage: NextPage<Props> = ({ category_trackID }) => {

    const ID = category_trackID instanceof Array ? undefined : category_trackID;

    return (
        <Container>
            <Header />
            <main>
                <CategorySection trackId={ID} />
            </main>
            <Footer />
        </Container>
    );
}

CategoryPage.getInitialProps = async ({ store, query }: NextPageContext & NextJSContext) => {
    const { category_trackID } = query;
    store.dispatch(productRequest(`/products/?category_trackID=${category_trackID}`));
    store.dispatch(filterRequest(`/category/filterKey/${category_trackID}`));
    store.dispatch(categoryRequest(`/get-categories`));
    return { category_trackID };
}

export default CategoryPage;