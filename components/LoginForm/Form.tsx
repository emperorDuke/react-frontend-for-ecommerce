import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Formik, ErrorMessage } from "formik";
import { LoginFormProps } from "./@types";
import Link from "../Link";

function Form(props: LoginFormProps) {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      schema={props.schema}
    >
      {(formikProps) => {
        // if (props.serverErrors) formikProps.setErrors(props.serverErrors);
        return (
          <React.Fragment>
            <form
              onSubmit={formikProps.handleSubmit}
              onReset={formikProps.handleReset}
            >
              <Grid container spacing={1} direction="column">
                {Object.keys(props.initialValues).map((key) => (
                  <Grid item xs={12}>
                    <TextField
                      id={key}
                      name={key}
                      type="text"
                      label={key}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={(formikProps.values as any)[key]}
                      required
                      placeholder={key}
                      color="secondary"
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage name={key} />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
                marginTop: "8px",
              }}
            >
              <div style={{ flexGrow: 1 }} />
              <Typography variant="caption">
                New Member ?{" "}
                <Link href="/" color="secondary">
                  Create Account
                </Link>
              </Typography>
            </div>
          </React.Fragment>
        );
      }}
    </Formik>
  );
}

export default Form;
