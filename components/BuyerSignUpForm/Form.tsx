import React, { useMemo } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import { BuyerSignUpFormProps } from "./@types";
import useStyles from "./styles";
import { useDidUpdateEffect } from "../../utils";
import { sortFunction } from "./utils";

function Form(props: BuyerSignUpFormProps) {
  const classes = useStyles();

  const sortedInitialValues = useMemo(() => {
    const obj: any = {};

    Object.keys(props.initialValues)
      .sort(sortFunction)
      .forEach((key) => {
        obj[key] = props.initialValues[key];
      });

    return obj as BuyerSignUpFormProps["initialValues"];
  }, [props.initialValues]);

  const textFields = useMemo(() => {
    const EXCLUDE_FIELDS = [
      "country",
      "state",
      "id",
      "zip_code",
      "shipping_id",
    ];

    const filterFunc = (key: string) => !EXCLUDE_FIELDS.includes(key);

    return Object.keys(sortedInitialValues).filter(filterFunc);
  }, [sortedInitialValues]);

  const selectFields = useMemo(() => {
    const ONLY_FIELDS = ["state", "country"];
    const filterFunc = (key: string) => ONLY_FIELDS.includes(key);

    return Object.keys(sortedInitialValues).filter(filterFunc);
  }, [sortedInitialValues]);

  const formValues = useMemo(() => {
    const obj: any = {};

    textFields.concat(selectFields).forEach((field) => {
      obj[field] = sortedInitialValues[field];
    });

    return obj as BuyerSignUpFormProps["initialValues"];
  }, [textFields, selectFields, sortedInitialValues]);

  const getId = () => {
    if (sortedInitialValues.shipping_id) {
      return sortedInitialValues.shipping_id;
    }
  };

  const handleSubmit = (values: BuyerSignUpFormProps["initialValues"]) => {
    props.onSubmit(values, getId());
  };

  const formik = useFormik({
    initialValues: formValues,
    onSubmit: handleSubmit,
    validationSchema: props.schema,
  });

  useDidUpdateEffect(() => {
    const onSuccess = props.serverSuccessMessage;

    if (onSuccess && !!Object.keys(onSuccess).length) {
      formik.setSubmitting(false);
    }
  }, [props.serverSuccessMessage]);

  useDidUpdateEffect(() => {
    const onError = props.serverErrors;

    if (onError && !!Object.keys(onError).length) {
      formik.setErrors(onError as any);
    }
  }, [props.serverErrors]);

  const getFieldType = (key: string) => {
    switch (key.toLowerCase()) {
      case "email":
        return "email";
      case "password":
        return "password";
      default:
        return "text";
    }
  };

  const getWidth = (key: string) => {
    if (key === "address" || key === "email") {
      return 12;
    } else {
      return 6;
    }
  };

  const changeSnakeCase = (key: string) => {
    return key.split("_").join(" ");
  };

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <Grid container spacing={1}>
        {textFields.map((key) => (
          <Grid item xs={getWidth(key)} container direction="column" key={key}>
            <Grid item>
              <TextField
                id={key}
                name={key}
                type={getFieldType(key)}
                label={changeSnakeCase(key)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[key]}
                required
                fullWidth
                placeholder={changeSnakeCase(key)}
                variant="outlined"
                InputLabelProps={{
                  className: classes.label,
                }}
              />
            </Grid>
            <Grid item>
              <div className={classes.error}>
                {formik.touched[key] && formik.errors[key] && (
                  <span>{formik.errors[key]}</span>
                )}
              </div>
            </Grid>
          </Grid>
        ))}
        {!!selectFields.length &&
          selectFields.map((key) => (
            <Grid item xs={6} container direction="column" key={key}>
              <Grid item>
                <TextField
                  select
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  value={formik.values[key]}
                  label={key}
                  name={key}
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.label,
                  }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {formik.values[key] ? (
                    <option value={formik.values[key]}>
                      {formik.values[key]}
                    </option>
                  ) : (
                    <option defaultValue={key}>{key}</option>
                  )}
                </TextField>
              </Grid>
              <Grid item>
                <div className={classes.error}>
                  {formik.touched[key] && formik.errors[key] && (
                    <span>{formik.errors[key]}</span>
                  )}
                </div>
              </Grid>
            </Grid>
          ))}
        <Grid item xs={12} container>
          {props.onCancel && (
            <Grid item xs={6}>
              <Button
                onClick={props.onCancel}
                variant="outlined"
                color="primary"
                fullWidth
              >
                cancel
              </Button>
            </Grid>
          )}
          <Grid item xs>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {formik.isSubmitting ? "sending" : "submit"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default Form;
