import React from "react";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import { SearchBarProps } from "./@types";
import SearchIcon from "@material-ui/icons/Search";

const CustomSearch: React.ComponentType<SearchBarProps> = ({
  locations,
  categories,
  queries,
  onChange,
  postSearch,
}) => {
  const classes = useStyles();

  const LocationOptions = locations.map((location) => (
    <option value={location} key={location}>
      {location}
    </option>
  ));

  const categoryOptions = categories.map((category) =>
    category.children.map((child, i) => (
      <option
        value={child.name}
        key={`${child.name}${i}`}
        className={classes.options}
      >
        {child.name}
      </option>
    ))
  );

  return (
    // <Grid container spacing={1}>
    //   <Grid item>
    <div className={classes.wrapper} tabIndex={0}>
      <InputBase
        id="search-input"
        type="text"
        className={classes.inputField}
        value={queries["query"]}
        onChange={(e) => onChange({ ...queries, query: e.target.value })}
        placeholder="search for any product or store in any location"
        // startAdornment={
        //   <NativeSelect
        //     disableUnderline
        //     value={queries["location"]}
        //     onChange={e => onChange({ ...queries, location: e.target.value })}
        //     className={classes.selectLeft}
        //     classes={{
        //       select: classes.selectRootLeft
        //     }}
        //   >
        //     <option value={queries["location"]}>{queries["location"]}</option>
        //     {LocationOptions}
        //   </NativeSelect>
        // }
        startAdornment={
          <NativeSelect
            disableUnderline
            value={queries["category"]}
            onChange={(e) => onChange({ ...queries, category: e.target.value })}
            className={classes.selectRight}
            classes={{
              select: classes.selectRootRight,
            }}
          >
            <option value={queries["category"]}>{queries["category"]}</option>
            {categoryOptions}
          </NativeSelect>
        }
        endAdornment={
          <IconButton onClick={postSearch} color="secondary">
            <SearchIcon />
          </IconButton>
        }
        inputProps={{
          className: classes.inputRoot,
          "aria-label": "search",
        }}
      />
    </div>
    //  </Grid>
    //   <Grid item>
    //     <Button
    //       onClick={postSearch}
    //       className={classes.button}
    //       variant="contained"
    //       color="secondary"
    //     >
    //       <SearchIcon />
    //     </Button>
    //   </Grid>
    // </Grid>
  );
};

export default CustomSearch;
