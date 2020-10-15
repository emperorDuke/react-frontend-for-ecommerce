import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import { LoginFormProps } from "./@types";
import Link from "../../Link";
import useStyles from "./styles";
import { useDidUpdateEffect } from "../../../utils";

function Form(props: LoginFormProps) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validationSchema: props.schema,
  });

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

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Grid container spacing={1}>
            {Object.keys(props.initialValues).map((key) => (
              <Grid item container xs={12} direction="column" key={key}>
                <Grid item>
                  <TextField
                    id={key}
                    name={key}
                    type={getFieldType(key)}
                    label={key}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[key]}
                    required
                    placeholder={key}
                    color="primary"
                    variant="outlined"
                    fullWidth
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
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.flex}>
          <div className={classes.spacer} />
          <Typography variant="body2" component="span">
            New Member ?{" "}
            <Link href="/" color="secondary">
              Create Account
            </Link>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

export default Form;
