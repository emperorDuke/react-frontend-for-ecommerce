import React, { useMemo, useState, useEffect } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { apiUrl } from "../../services";
import { BuyerSignUpForm } from "../BuyerSignUpForm";
import useSelector from "../../redux/utils/useStoreSelector";
import { DefaultAddress , constructShippingData } from "./DefaultAddress";
import { addAddress } from "../../redux/actionCreators/AddressActions";
import { serialize } from "object-to-formdata";
import { useRequest } from "../../utils";

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
    root: {
      padding: theme.spacing(1),
    },
  })
);

function AddressSection() {
  const dispatch = useDispatch();
  const shipping = useSelector(({ addressBook }) => addressBook.shipping);
  const onAddressAdd = useRequest({ auth: true });
  const classes = useStyles();
  const [addressError, setAddressError] = useState<any>({});

  const defaultAddress = useMemo(() => {
    if (shipping.length) {
      return shipping.find((s) => !!s.default);
    }
  }, [shipping]);

  useEffect(() => {
    const onFailed = onAddressAdd.status === "failed";
    const onSuccess = onAddressAdd.status === "success";

    if (onSuccess && onAddressAdd.data) {
      dispatch(addAddress(onAddressAdd.data));
    }

    if (onFailed && onAddressAdd.error) {
      setAddressError(onAddressAdd.error);
    }
  }, [onAddressAdd.status]);

  const allAddresses = shipping.length ? shipping : undefined;

  const initialValues = {
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    city: "",
    state: "",
    country: "Nigeria",
    zip_code: "",
  };

  const handleAddressForm = (values: {}) => {
    const shippingData = constructShippingData(values);

    onAddressAdd.request({
      method: "POST",
      url: apiUrl("postShippingDetail"),
      data: serialize(shippingData, { indices: true }),
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={1}>
        <Grid item container>
          <Grid item xs={12}>
            {defaultAddress ? (
              <DefaultAddress
                defaultAddress={defaultAddress}
                addresses={allAddresses}
                onSubmit={handleAddressForm}
                schema={schema}
                initialValues={initialValues}
                serverErrors={addressError}
              />
            ) : (
              <BuyerSignUpForm
                onSubmit={handleAddressForm}
                schema={schema}
                initialValues={initialValues}
                serverErrors={addressError}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddressSection;
