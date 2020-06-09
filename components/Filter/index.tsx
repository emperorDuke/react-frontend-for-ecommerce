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
  navItems: Array<{ name: string; track_id: string }>;
}> = memo(({ navItems }) => {
  const list = navItems.map(({ name, track_id }) => (
    <Link
      key={track_id}
      href={{
        pathname: `items/${name.split(" ").join("-")}`,
        query: { categoryTrackID: track_id }
      }}
    >
      <ListItem button>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
  ));

  return <List>{list}</List>;
});

const Filters: React.ComponentType<FilterProps> = props => {
  const attributeFilter: Array<JSX.Element> = [];

  for (let filterKey in props.filters) {
    let attribute = props.filters[filterKey];

    if (filterKey === "price") {
      attributeFilter.push(
        <>
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
        </>
      );
    } else if (filterKey === "brand") {
      attributeFilter.push(
        <>
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
        </>
      );
    } else {
      attributeFilter.push(
        <>
          <Grid item>
            <InputXcheckbox
              label={filterKey}
              postQuery={props.postQuery}
              items={attribute}
              disableInputEl
            />
          </Grid>
          <Grid item>
            <Divider/>
          </Grid>
        </>
      );
    }
  }

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        {props.categories && props.categories.length > 0 && (
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
