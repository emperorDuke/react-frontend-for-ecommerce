import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Formik, ErrorMessage } from "formik";
import { FormProps } from "./@types";

function Form(props: FormProps) {
  const pick = (...params: string[]) => {
    const filteredKeys: string[] = [];
    const allKeys = Object.keys(props.initialValues);

    allKeys.forEach((key) => {
      if (params.includes(key)) filteredKeys.push(key);
    });

    return filteredKeys;
  };

  const cancel = () => {
    if (props.onCancel) props.onCancel();
  };

  return (
    <Formik
      initialValues={{ ...props.initialValues }}
      onSubmit={props.onSubmit}
      validationSchema={props.schema}
    >
      {(formikProps) => {
        // if (props.serverErrors) formikProps.setErrors(props.serverErrors);
        return (
          <form onSubmit={formikProps.handleSubmit} onReset={formikProps.handleReset}>
            <Grid container spacing={1}>
              {pick("first_name", "middle_name", "last_name", "email").map(
                (key) => (
                  <Grid item>
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
                    />
                    <ErrorMessage name={key} />
                  </Grid>
                )
              )}
              <Grid item>
                <TextField
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  label="phone number"
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  value={formikProps.values.last_name}
                  placeholder="phone number"
                  color="secondary"
                  variant="outlined"
                />
                <ErrorMessage name="phone_number" />
              </Grid>
              {pick("password", "confirm_password").map((key) => (
                <Grid item>
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
                  />
                  <ErrorMessage name={key} />
                </Grid>
              ))}
              <Grid item>
                <TextField
                  id="address"
                  name="address"
                  type="text"
                  label="Address"
                  required
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  value={formikProps.values.address}
                  placeholder="Address"
                  color="secondary"
                  variant="outlined"
                />
                <ErrorMessage name="address" />
              </Grid>
              <Grid item>
                <TextField
                  id="zip_code"
                  name="zip_code"
                  type="text"
                  label="Zip Code"
                  required
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  value={formikProps.values.zip_code}
                  placeholder="Zip code"
                  color="secondary"
                  variant="outlined"
                />
                <ErrorMessage name="zip_code" />
              </Grid>
              <Grid item>
                <TextField
                  select
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="Nigeria"> Nigeria</option>
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  select
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="Lagos">Lagos</option>
                </TextField>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item>
                <Button onClick={cancel} variant="outlined" color="secondary">
                  cancel
                </Button>
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" color="secondary">
                  submit
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
}

export default Form;
