import React, { memo } from "react";
import { FilterProps } from "./@types";
import SliderInput from "../SliderWithInput";
import Grid from "@material-ui/core/Grid";
import InputXcheckbox from "./InputXcheckbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Link from "next/link";
import RadioComponent from "./RadioComponent";

export * from "./@types";

const Categories: React.ComponentType<{
  navItems: Array<{ name: string; id: string }>;
}> = memo(({ navItems }) => {
  const list = navItems.map(({ name, id }) => (
    <Link key={id} href="/items/[slug]" as={`/items/${name}?id=${id}`}>
      <ListItem button>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
  ));

  return <List>{list}</List>;
});

const Filters: React.ComponentType<FilterProps> = (props) => {
  const attributeFilter: Array<JSX.Element> = [];

  for (let filterKey in props.filters) {
    let attribute = props.filters[filterKey];

    if (filterKey === "price") {
      attributeFilter.push(
        <React.Fragment>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <RadioComponent
                  items={attribute}
                  postQuery={props.postQuery}
                  label={filterKey}
                />
              </Grid>
            </Grid>
            <Grid item>
              <SliderInput items={attribute} postQuery={props.postQuery} />
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
        </React.Fragment>
      );
    } else if (filterKey === "brand") {
      attributeFilter.push(
        <React.Fragment>
          <Grid item>
            <InputXcheckbox
              label={filterKey}
              postQuery={props.postQuery}
              items={attribute}
            />
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
        </React.Fragment>
      );
    } else {
      attributeFilter.push(
        <React.Fragment>
          <Grid item>
            <InputXcheckbox
              label={filterKey}
              postQuery={props.postQuery}
              items={attribute}
              disableInputEl
            />
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
        </React.Fragment>
      );
    }
  }

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        {props.categories && props.categories.length && (
          <Categories navItems={props.categories} />
        )}
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      {attributeFilter}
    </Grid>
  );
};

export default Filters;
