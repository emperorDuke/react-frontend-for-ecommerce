import React, { useState, useEffect } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { RadioComponentProps } from "./@types";
import useStyles from "./styles";

const RadioComponent: React.ComponentType<RadioComponentProps> = props => {
  const [localItems, setLocalItems] = useState({ items: props.items, idx: 0 });

  const classes = useStyles();

  useEffect(() => {
    const idx = localItems["idx"];
    const value = localItems["items"][idx]["value"];
    const checked = localItems["items"][idx]["checked"];

    if (checked) props.postQuery(value);
  }, [localItems]);

  const handleChange = () => (
    e: React.ChangeEvent<HTMLInputElement>,
    val: string
  ) => {
    const clonedLocalItems = Object.assign({}, localItems);
    clonedLocalItems["items"].forEach((item, i) => {
      if (item.value === val) {
        item["checked"] = e.target.checked;
        item["value"] = val;
        clonedLocalItems["idx"] = i;
      }
    });
    setLocalItems(clonedLocalItems);
  };
  return (
    <FormControl>
      <FormLabel component="legend" className={classes.label}>
        {props.label}
      </FormLabel>
      <RadioGroup
        aria-label={props.label}
        name={props.label}
        value={localItems.items[localItems.idx]["value"]}
        onChange={handleChange()}
      >
        {localItems["items"].map(({ key, value }) => (
          <FormControlLabel
            control={<Radio />}
            label={key}
            value={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioComponent;
