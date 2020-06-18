import React, { useState, useEffect, useCallback } from "react";
import { InputXcheckboxProps } from "./@types";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";

export * from "./@types";

const InputXcheckbox: React.ComponentType<InputXcheckboxProps> = ({
  items,
  label,
  postQuery,
  disableInputEl = false
}) => {
  const [brand, setBrands] = useState("");
  const [localItems, setLocalItems] = useState({ items: items, index: 0 });

  const classes = useStyles();

  const setBrand = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setBrands(e.target.value),
    []
  );

  useEffect(() => {
    const idx = localItems["index"];
    const value = localItems["items"][idx]["value"];
    const checked = localItems["items"][idx]["checked"];

    if (checked) postQuery(value);
  }, [localItems]);

  const handleChange = (idx: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const clonedLocalItems = Object.assign({}, localItems);
    clonedLocalItems["items"][idx]["checked"] = e.target.checked;
    clonedLocalItems["index"] = idx;
    setLocalItems(clonedLocalItems);
  };

  const renderFormWithLabel = (withLabel = true) => {
    return (
      <FormControl>
        {withLabel && (
          <FormLabel component="legend" className={classes.label}>
            {label}
          </FormLabel>
        )}
        <FormGroup>
          {localItems["items"].map(({ key, value, checked }, i) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  value={value}
                  onChange={handleChange(i)}
                />
              }
              label={key}
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  };

  return (
    <>
      {disableInputEl ? (
        renderFormWithLabel(false)
      ) : (
        <Grid container spacing={1}>
          <Grid item>
            <FormControl>
              <FormLabel component="legend" className={classes.label}>
                {label}
              </FormLabel>
              <Input
                name="brand"
                placeholder="search for brand"
                value={brand}
                onChange={setBrand}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => postQuery(brand)}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>{renderFormWithLabel()}</Grid>
        </Grid>
      )}
    </>
  );
};

export default InputXcheckbox;
