import React, { useMemo, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Filter from "../Filter";
import useSelector from "../../redux/utils/useStoreSelector";
import { transformFilter, getCategories, insertOrEditQuery } from "./utils";
import { CategorySectionProps } from "./@types";
import { useDispatch } from "react-redux";
import { productRequest } from "../../redux/actionCreators/ProductActions";
import Sorter from "../Sorter";
import useStyles from "./styles";
import { useDidUpdate } from "../../utils/useDidUpdate";

export * from "./utils";
export * from "./@types";

const CategorySection: React.ComponentType<CategorySectionProps> = (props) => {
  const [stateQuery, setStateQuery] = useState(`category=${props.trackId}`);

  const filters = useSelector(({ filters }) => filters.filters);

  const categories = useSelector(({ categories }) => categories.categories);

  const classes = useStyles();

  const dispatch = useDispatch();

  useDidUpdate(() => {
    dispatch(productRequest(`/products/?${stateQuery}`));
  }, [stateQuery]);

  const transformedFilters = useMemo(() => {
    return transformFilter(filters);
  }, [filters]);

  const sortedCategories = useMemo(
    () => getCategories(categories, props.trackId),
    [categories, props.trackId]
  );

  const postQuery = (newSubQuery: string) => {
    setStateQuery((prevStateQuery) =>
      insertOrEditQuery(prevStateQuery, newSubQuery)
    );
  };

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" spacing={1}>
        <Grid item />
        <Grid item>
          <Grid container direction="row" spacing={1}>
            <Grid item>
              <div className={classes.layout}>
                {transformedFilters && (
                  <Filter
                    filters={transformedFilters}
                    categories={sortedCategories}
                    postQuery={postQuery}
                  />
                )}
              </div>
            </Grid>
            <Grid item md sm xs>
              <Sorter />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategorySection;
