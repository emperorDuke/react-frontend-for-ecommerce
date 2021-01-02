import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import useTheme from "@material-ui/core/styles/useTheme";
import CurrencyManager from "../CurrencyManager";
import { SliderWithInputProps } from "./@types";
import useStyles from "./styles";

function getValue(val: string, type: "min" | "max") {
  return type === "min" ? Number(val.split("-")[0]) : Number(val.split("-")[1]);
}

function getMinAndMaxValue(items: SliderWithInputProps["items"]) {
  const minRange = items[0].key;
  const maxRange = items[items.length - 1].key;
  return [getValue(minRange, "min"), getValue(maxRange, "max")];
}

const SliderWithInput: React.ComponentType<SliderWithInputProps> = (props) => {
  const [value, setValue] = useState({
    data: getMinAndMaxValue(props.items),
    dummy: [0, 100],
  });

  const classes = useStyles();

  const theme = useTheme();

  const handleInputChange = (type: "min" | "max") => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const slideValue = Math.floor(parseInt(e.target.value) / getInterval());
    
    if (type === "min") {
      setValue((prev) => ({
        data: [parseInt(e.target.value), prev.data[1]],
        dummy: [slideValue, prev.dummy[1]],
      }));
    } else {
      setValue((prev) => ({
        data: [prev.data[0], parseInt(e.target.value)],
        dummy: [prev.dummy[0], slideValue],
      }));
    }
  };

  const getInterval = () => {
    return value.data[1] / value.dummy[1];
  };

  const handleSlider = (e: React.ChangeEvent<{}>, val: number[] | number) => {
    setValue((prev) => ({
      data: Array.isArray(val)
        ? [
            Math.floor(val[0] * getInterval()),
            Math.floor(val[1] * getInterval()),
          ]
        : prev.data,
      dummy: Array.isArray(val) ? val : prev.dummy,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.postQuery(`price__gte=${value.data[0]}&price__lte=${value.data[1]}`);
  };

  return (
    <React.Fragment>
      <Slider
        value={value.dummy}
        onChange={handleSlider}
        aria-labelledBy="range-slider"
        color="secondary"
      />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexWrap: "nowrap",
          height: theme.spacing(4),
        }}
      >
        <FormControl>
          <Input
            type="text"
            placeholder={String(value.data[0])}
            value={value.data[0]}
            onChange={handleInputChange("min")}
            startAdornment={
              <InputAdornment position="start">
                <CurrencyManager />
              </InputAdornment>
            }
          />
        </FormControl>
        <div style={{ padding: theme.spacing(0, 1) }}>
          <Typography variant="subtitle1">-</Typography>
        </div>
        <FormControl>
          <Input
            type="text"
            placeholder={String(value.data[1])}
            value={value.data[1]}
            onChange={handleInputChange("max")}
            startAdornment={
              <InputAdornment position="start">
                <CurrencyManager />
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant="outlined" type="submit" className={classes.btn}>
          go
        </Button>
      </form>
    </React.Fragment>
  );
};

export default SliderWithInput;
