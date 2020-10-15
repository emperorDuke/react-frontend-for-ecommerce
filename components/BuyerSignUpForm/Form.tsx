import React, { useMemo } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import { FormProps } from "./@types";
import useStyles from "./styles";
import { useDidUpdateEffect } from "../../utils";

function Form(props: FormProps) {
  const classes = useStyles();

  const fields = useMemo(() => {
    return Object.keys(props.initialValues).filter(
      (key) => key !== "country" && key !== "state"
    );
  }, [props.initialValues]);

  const selectItems = useMemo(() => {
    return Object.keys(props.initialValues).filter(
      (key) => key === "state" || key === "country"
    );
  }, [props.initialValues]);

  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
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
      formik.setErrors(onError);
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
        {fields.map((key) => (
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
        {!!selectItems.length &&
          selectItems.map((key) => (
            <Grid item xs={6} container direction="column" key={key}>
              <Grid item>
                <TextField
                  select
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  label={key}
                  variant="outlined"
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
        <Grid item container xs={12}>
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
        </Grid>
        <Grid item xs>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {formik.isSubmitting ? "sending" : "submit"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Form;
