import React, { useState } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { apiUrl } from "../../services";
import { Posting } from "../../redux/actionCreators/PostActions";
import { BuyerSignUpForm } from "../BuyerSignUpForm";
import useSelector from "../../redux/utils/useStoreSelector";

const schema = yup.object().shape({
  first_name: yup
    .string()
    .required("first name is required !")
    .min(2, "first name is too short !"),
  last_name: yup
    .string()
    .required("last name is required !")
    .min(2, "last name is too short !"),
  address: yup.string().min(2, "Address is invalid !").notRequired(),
  phone_number: yup
    .string()
    .required("phone number is required")
    .min(11, "Invalid Phone Number"),
  country: yup.string().required("country is required !"),
  city: yup.string().required("city is required !"),
  state: yup.string().required("state is required !"),
  zip_code: yup.string().notRequired(),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      display: "flex",
      height: theme.spacing(20),
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      border: `1px solid ${theme.palette.secondary.light}`,
      borderRadius: theme.shape.borderRadius,
    },
    padding: {
      padding: theme.spacing(1),
    },
    grey: {
      color: theme.palette.grey[500],
    },
  })
);

function AddressSection() {
  const [openForm, setOpenForm] = useState(false);
  const [openAddressChangeForm, setAddressChangeForm] = useState(false);
  const dispatch = useDispatch();
  const shipping = useSelector(({ addressBook }) => addressBook.shipping);
  const classes = useStyles();

  const defaultAddress = shipping.length
    ? shipping.find((s) => s.default === true)
    : undefined;
  const allAddresses = shipping.length ? shipping : undefined;

  const initialValues = {
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    city: "",
    state: "",
    country: "Nigeria",
  };

  const handleAddressForm = (values: {}) => {
    dispatch(
      Posting({
        url: apiUrl("postShippingDetail"),
        body: JSON.stringify(values),
        reqAuth: true,
        config: { "Content-type": "application/json" },
      })
    );
  };

  return (
    <div className={classes.padding}>
      {/** default address */}
      <Grid container direction="column" spacing={1}>
        <Grid item container xs={12}>
          <Grid item>
            <Typography variant="h6">Delivery Address</Typography>
          </Grid>
          <div style={{ flexGrow: 1 }} />
          <Grid item>
            {defaultAddress ? (
              <Button
                startIcon={<AddIcon />}
                onClick={() => setAddressChangeForm(true)}
                color="primary"
                variant="outlined"
              >
                change address
              </Button>
            ) : null}
          </Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              {defaultAddress ? (
                <div className={classes.center}>
                  {Object.keys(defaultAddress)
                    .filter((key) => key !== "id")
                    .map((key) => (
                      <TextField
                        id={key}
                        key={key}
                        name={key}
                        type="text"
                        label={key}
                        value={defaultAddress[key]}
                        disabled
                        variant="outlined"
                      />
                    ))}
                </div>
              ) : (
                <BuyerSignUpForm
                  onSubmit={handleAddressForm}
                  schema={schema}
                  initialValues={initialValues}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/** list of default address and saved addresses */}
      <Dialog
        open={openAddressChangeForm}
        onClose={() => setAddressChangeForm(false)}
        aria-labelledby="dialog-for-address-change"
        fullWidth
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
            {allAddresses ? (
              allAddresses.map((address) => (
                <Grid item container direction="column" key={address.id}>
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
              ))
            ) : (
              <Typography variant="h5">Add your shipping details</Typography>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
      {/** form for adding new address */}
      <Dialog
        open={openForm}
        aria-labelledby="dialog-for-address-form"
        fullWidth
      >
        <DialogTitle>Add new address</DialogTitle>
        <DialogContent>
          <BuyerSignUpForm
            onSubmit={handleAddressForm}
            schema={schema}
            initialValues={initialValues}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddressSection;
