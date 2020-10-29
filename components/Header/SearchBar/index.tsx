import React, { useState } from "react";
import clsx from "classnames";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import NativeSelect from "@material-ui/core/NativeSelect";
import useStyles from "./styles";
import { SearchBarProps } from "./@types";
import SearchIcon from "@material-ui/icons/Search";

const CustomSearch: React.ComponentType<SearchBarProps> = (props) => {
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState(false);
  
  const categoryOptions = props.categories.map((category) =>
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
    <div
      className={clsx(classes.wrapper, { [classes.focus]: isFocused })}
      tabIndex={0}
    >
      <InputBase
        id="search-input"
        type="text"
        className={classes.inputField}
        value={props.queries["query"]}
        onChange={(e) => props.onChange({ ...props.queries, query: e.target.value })}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="search for any product or store in any location"
        startAdornment={
          <NativeSelect
            disableUnderline
            value={props.queries["category"]}
            onChange={(e) => props.onChange({ ...props.queries, category: e.target.value })}
            className={classes.selectRight}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            classes={{
              select: classes.selectRootRight,
            }}
          >
            <option value={props.queries["category"]}>{props.queries["category"]}</option>
            {categoryOptions}
          </NativeSelect>
        }
        endAdornment={
          <IconButton onClick={props.postSearch}>
            <SearchIcon />
          </IconButton>
        }
        inputProps={{
          className: classes.inputRoot,
          "aria-label": "search",
        }}
      />
    </div>
  );
};

export default CustomSearch;
