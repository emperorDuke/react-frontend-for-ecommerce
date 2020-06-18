import React, { useState, useMemo } from "react";
import { Formik, ErrorMessage } from "formik";
import yup from "yup";
import { useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useUser, apiUrl } from "../../services";
import { Posting } from "../../redux/actionCreators/PostActions";

function AddressSection() {
  const [openForm, setOpenForm] = useState(false);
  const [openAddressChangeForm, setAddressChangeForm] = useState(false);
  const buyer = useUser("buyer");
  const dispatch = useDispatch();
  const defaultAddress = buyer.addressBook && buyer.addressBook.getDefault();

  const initialValues = {
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    country: "Nigeria",
    city: "",
    state: "",
    zip_code: "",
  };

  const handleAddressForm = (values: typeof initialValues) => {
    dispatch(
      Posting({
        url: apiUrl("postAttributes"),
        body: JSON.stringify(values),
        reqAuth: true,
        config: { "Content-type": "application/json" },
      })
    );
  };

  return (
    <Paper>
      {/** default address */}
      <Grid container>
        <Grid item>
          <Typography variant="h4">Delivery Address</Typography>
        </Grid>
        <Grid item>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setAddressChangeForm(true)}
            color="secondary"
            variant="outlined"
          >
            change
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid container>
        <Grid item>
          {defaultAddress &&
            Object.keys(defaultAddress)
              .filter((key) => key !== "id")
              .map((key) => (
                <TextField
                  id={key}
                  name={key}
                  type="text"
                  label={key}
                  value={defaultAddress[key]}
                  disabled
                  variant="outlined"
                />
              ))}
        </Grid>
      </Grid>
      {/** list of default address and saved addresses */}
      <Dialog
        open={openAddressChangeForm}
        onClose={() => setAddressChangeForm(false)}
        aria-labelledby="dialog-for-address-change"
      >
        <DialogTitle>Change Address</DialogTitle>
        <DialogActions>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenForm(true)}
            color="secondary"
            variant="outlined"
          >
            add new address
          </Button>
        </DialogActions>
        <DialogContent>
          <Divider />
          <Grid container direction="column">
            {buyer.addressBook &&
              buyer.addressBook.all().map((address) => (
                <Grid item>
                  <Grid container direction="column">
                    {Object.keys(address)
                      .filter((key) => key !== "id")
                      .map((key) => (
                        <Grid item>
                          <TextField
                            id={key}
                            name={key}
                            type="text"
                            label={key}
                            value={address[key]}
                            disabled
                            variant="outlined"
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </DialogContent>
      </Dialog>
      {/** form for adding new address */}
      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        aria-labelledby="dialog-for-address-form"
      >
        <DialogTitle>Add new address</DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpenForm(false)}
            color="secondary"
          >
            cancel
          </Button>
        </DialogActions>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleAddressForm(values)}
            validationSchema={yup.object().shape({
              first_name: yup
                .string()
                .required("first name is required !")
                .min(2, "first name is too short !"),
              middle_name: yup.string().notRequired(),
              last_name: yup
                .string()
                .required("last name is required !")
                .min(2, "last name is too short !"),
              address: yup
                .string()
                .min(2, "Address is invalid !")
                .notRequired(),
              phone_number: yup
                .string()
                .required("phone number is required")
                .min(11, "Invalid Phone Number"),
              country: yup.string().required("country is required !"),
              city: yup.string().required("city is required !"),
              state: yup.string().required("state is required !"),
              zip_code: yup.string().notRequired(),
            })}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit} onReset={props.handleReset}>
                {Object.keys(initialValues).map((key) => (
                  <React.Fragment>
                    <TextField
                      id={key}
                      name={key}
                      type="text"
                      label={key}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.address}
                      required
                      placeholder={key}
                      color="secondary"
                      variant="outlined"
                    />
                    <ErrorMessage name={key} />
                  </React.Fragment>
                ))}
                <Grid container>
                  <Grid item>
                    <Button type="submit" variant="contained" color="secondary">
                      submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}

export default AddressSection;
