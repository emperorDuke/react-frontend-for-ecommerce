import React, { useEffect, useMemo, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Filter from "../Filter";
import useSelector from "../../redux/utils/useStoreSelector";
import * as _ from "./utils";
import { CategorySectionProps } from "./@types";
import { useDispatch } from "react-redux";
import { productRequest } from "../../redux/actionCreators/ProductActions";
import Sorter from "../Sorter";
import useStyles from "./styles";

export * from "./utils";
export * from "./@types";

const CategorySection: React.ComponentType<CategorySectionProps> = props => {
  const query = `category-trackId=${props.trackId}`;

  const [stateQuery, setStateQuery] = useState(query);

  const filters = useSelector(({ filters }) => filters.filters);

  const categories = useSelector(({ categories }) => categories.categories);

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => setStateQuery(query), [props.trackId]);

  _.useDidUpdate(() => dispatch(productRequest(`/products/?${stateQuery}`)), [
    query
  ]);

  const transformedFilters = useMemo(() => _.transformFilter(filters), [
    filters
  ]);

  const sortedCategories = useMemo(
    () => _.getCategories(categories, props.trackId),
    [categories]
  );

  const postQuery = (newSubQuery: string) => {
    setStateQuery(prevStateQuery =>
      _.insertOrEditQuery(prevStateQuery, newSubQuery)
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
