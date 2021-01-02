import React, { useMemo, useState, useEffect } from "react";
import clsx from "classnames";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import * as actions from "../../../redux/actionCreators/AddressActions";
import * as T from "./@types";
import { BuyerSignUpForm } from "../../BuyerSignUpForm";
import { flatten, useRequest } from "../../../utils";
import { useDispatch } from "react-redux";
import { apiUrl as path } from "../../../services";
import { serialize } from "object-to-formdata";
import { useStyles } from "./styles";
import { constructShippingData, FIELDS } from "./utils";
import Highlighter from "../Highlighter";
import CheckerIcon from "../CheckerIcon";
import { shippingSchema } from "./schema";

function AddressDialogForm(props: T.AddressDialogFormProps) {

  const handleClose = () => props.setDialogState(false);

  return (
    <Dialog
      open={props.dialogState}
      aria-labelledby="address-title"
      aria-describedby="dialog-for-new-address"
      fullWidth
    >
      <DialogTitle id="address-title">
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12} container alignItems="center">
            <Grid item>
              <Typography variant="h6">Delivery Address</Typography>
            </Grid>
            <div style={{ flexGrow: 1 }} />
            <Grid item>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers id="dialog-for-new-address">
        <BuyerSignUpForm
          onSubmit={props.onSubmit}
          schema={props.schema}
          initialValues={props.initialValues}
        />
      </DialogContent>
    </Dialog>
  );
}

function AddressSection(props: T.DefaultAddressProps) {
  const allAddresses = props.shipping.length ? props.shipping : undefined;
  const INITIALVALUES = {
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    city: "",
    state: "",
    country: "Nigeria",
    zip_code: "",
  };

  const dispatch = useDispatch();
  const classes = useStyles();
  const [openNewAddress, setOpenNewAddress] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [openChangeAddress, setOpenChangeAddress] = useState(false);
  const [shippingId, setShippingId] = useState<string | number>(-1);
  const [editError, setEditError] = useState<any>({});
  const [addressError, setAddressError] = useState<any>({});
  const onAddressAdd = useRequest({ auth: true });
  const onAddressDefault = useRequest({ auth: true });
  const onAddressEdit = useRequest({ auth: true });
  const onAddressDelete = useRequest({ auth: true });

  const defaultAddress = useMemo(() => {
    if (allAddresses) {
      const defaultAddress = allAddresses.find((s) => !!s.default);

      if (defaultAddress) {
        const flatObject = flatten(defaultAddress);

        flatObject["shipping_id"] = defaultAddress.id;
        return flatObject;
      }
    }
  }, [allAddresses]);

  const addresses = useMemo(() => {
    return (
      allAddresses &&
      (allAddresses.map((address) => {
        const flatObject = flatten(address);
        flatObject["shipping_id"] = address.id;
        return flatObject;
      }) as T.InitialValues[])
    );
  }, [allAddresses, defaultAddress]);

  const filterdDefaultAddress = useMemo(() => {
    const obj: any = {};

    if (defaultAddress) {
      Object.keys(defaultAddress)
        .filter((key) => FIELDS({ excludeID: false }).includes(key))
        .forEach((key) => {
          obj[key] = defaultAddress[key];
        });

      return obj as T.InitialValues;
    }
  }, [defaultAddress]);

  useEffect(() => {
    if (defaultAddress && defaultAddress.shipping_id) {
      setShippingId(defaultAddress.shipping_id);
    }
  }, [filterdDefaultAddress]);

  useEffect(() => {
    const onFailed = onAddressAdd.status === "failed";
    const onSuccess = onAddressAdd.status === "success";

    if (onSuccess && onAddressAdd.data) {
      dispatch(actions.addAddress(onAddressAdd.data));
    }

    if (onFailed && onAddressAdd.error) {
      setAddressError(onAddressAdd.error);
    }
  }, [onAddressAdd.status]);

  useEffect(() => {
    const status = onAddressEdit.status;
    const error = onAddressEdit.error;
    const data = onAddressEdit.data;

    if (status === "success" && data) {
      dispatch(actions.updateAddress(data));
    }
    if (status === "failed" && error) {
      setEditError(error);
    }
  }, [onAddressEdit.status]);

  useEffect(() => {
    const status = onAddressDefault.status;
    const data = onAddressDefault.data;

    if (status === "success") {
      dispatch(actions.updateAddress(data));

      // server will return data with `id` not `shipping_id`
      if (data.id) setShippingId(data.id);
    }
  }, [onAddressDefault.status]);

  useEffect(() => {
    const status = onAddressDelete.status;

    if (status === "success") {
      dispatch(actions.requestAddress(path("getShippingDetails")));
    }

    if (status === "failed") {
      console.error("failed to delete");
    }
  }, [onAddressDelete.status]);

  const removeUnderscore = (key: string) => {
    return key.split("_").join(" ");
  };

  const handleOpenNewAddress = (param: boolean) => () => {
    setOpenNewAddress(param);
    setOpenChangeAddress(false);
  };

  const handleCloseNewAddress = (param: boolean) => {
    setOpenNewAddress(param);
    setOpenChangeAddress(true);
  };

  const handleEditAddressForm = (values: any, id?: string | number) => {
    const shippingObj = constructShippingData(values);

    onAddressEdit.request({
      method: "PATCH",
      url: path("updateShippingDetail", id),
      data: serialize(shippingObj, { indices: true }),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const handleMarkAsDefault = (id?: string | number) => () => {
    onAddressDefault.request({
      method: "PATCH",
      url: path("updateShippingDetail", id),
      data: JSON.stringify({
        default: true,
      }),
    });
  };

  const handleAddressDelete = (id?: string | number) => () => {
    onAddressDelete.request({
      method: "DELETE",
      url: path("updateShippingDetail", id),
    });
  };

  const handleAddAddressForm = (values: {}) => {
    const shippingData = constructShippingData(values);

    onAddressAdd.request({
      method: "POST",
      url: path("postShippingDetail"),
      data: serialize(shippingData, { indices: true }),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const OtherAddressesDialog = (
    <Dialog
      open={openChangeAddress}
      fullWidth
      maxWidth="md"
      scroll="paper"
      aria-labelledby="saved-addresses"
      aria-describedby="addresses"
    >
      <DialogTitle id="saved-addresses">
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12} container alignItems="center">
            <Grid item>
              <Typography variant="h6">Saved Addresses</Typography>
            </Grid>
            <div style={{ flexGrow: 1 }} />
            <Grid item>
              <IconButton onClick={() => setOpenChangeAddress(false)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers id="addresses">
        <Grid container spacing={1}>
          {addresses && addresses.length ? (
            addresses.map(({ shipping_id, ...address }) => (
              <Grid item xs={4} key={shipping_id}>
                <Highlighter
                  open={shippingId === shipping_id}
                  close={shippingId !== shipping_id}
                >
                  <div className={classes.addressCard}>
                    <Grid container spacing={1}>
                      <Grid item xs={10}>
                        {FIELDS({ minimal: true }).map((key) => (
                          <Grid container spacing={1} wrap="nowrap" key={key}>
                            <Grid item>
                              <Typography
                                variant="caption"
                                noWrap
                                className={clsx(
                                  classes.text,
                                  classes.textColor
                                )}
                              >
                                {removeUnderscore(key)}:
                              </Typography>
                            </Grid>
                            <Grid item xs={10}>
                              <Typography
                                variant="subtitle2"
                                noWrap
                                className={classes.text}
                              >
                                {address[key]}
                              </Typography>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                      <Grid item xs>
                        <CheckerIcon
                          open={shippingId === shipping_id}
                          close={shippingId !== shipping_id}
                        />
                      </Grid>
                      <Grid item xs={12} container spacing={2}>
                        <Grid item>
                          <Button
                            size="small"
                            color="primary"
                            aria-label="delete"
                            onClick={handleAddressDelete(shipping_id)}
                            startIcon={<DeleteIcon />}
                          >
                            delete
                          </Button>
                        </Grid>
                        {filterdDefaultAddress &&
                          filterdDefaultAddress.id !== shipping_id && (
                            <Grid item>
                              <Button
                                variant="outlined"
                                size="small"
                                color="primary"
                                aria-label="use as default"
                                onClick={handleMarkAsDefault(shipping_id)}
                              >
                                use as default
                              </Button>
                            </Grid>
                          )}
                      </Grid>
                    </Grid>
                  </div>
                </Highlighter>
              </Grid>
            ))
          ) : (
            <Typography variant="h6">You have no saved address</Typography>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<AddIcon />}
          color="primary"
          onClick={handleOpenNewAddress(true)}
          variant="contained"
        >
          add address
        </Button>
      </DialogActions>
    </Dialog>
  );

  const DefaultAddress = (
    <React.Fragment>
      <Grid item container alignItems="center">
        <Grid item>
          <Typography variant="subtitle1">Default Address</Typography>
        </Grid>
        <div style={{ flexGrow: 1 }} />
        <Grid item>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setOpenChangeAddress(true)}
          >
            change address
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.defaultAddressWrapper}>
          <Grid container>
            <Grid item container xs={10}>
              <Grid item container xs={12} spacing={1}>
                {FIELDS({}).map((key) => (
                  <Grid item container spacing={1} wrap="nowrap" key={key}>
                    <Grid item>
                      <Typography
                        variant="body2"
                        className={clsx(classes.text, classes.textColor)}
                        noWrap
                      >
                        {removeUnderscore(key)}:
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography
                        variant="body2"
                        className={classes.text}
                        noWrap
                      >
                        {defaultAddress && defaultAddress[key]}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <div style={{ flexGrow: 1 }} />
            <Grid item xs>
              <Button
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => setOpenEditAddress(true)}
              >
                edit
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </React.Fragment>
  );

  const AddressStep = (
    <Grid container spacing={1}>
      {DefaultAddress}

      {/* dialog open form for adding a new address */}

      <AddressDialogForm
        dialogState={openNewAddress}
        setDialogState={handleCloseNewAddress}
        schema={shippingSchema}
        onSubmit={handleAddAddressForm}
        initialValues={INITIALVALUES}
        serverErrors={addressError}
      />

      {/* dialog open form for editing address */}

      {filterdDefaultAddress && (
        <AddressDialogForm
          dialogState={openEditAddress}
          setDialogState={setOpenEditAddress}
          schema={shippingSchema}
          onSubmit={handleEditAddressForm}
          initialValues={filterdDefaultAddress}
          serverErrors={editError}
        />
      )}

      {/* dialog open saved addressing */}

      {OtherAddressesDialog}
    </Grid>
  );

  return (
    <React.Fragment>
      {defaultAddress ? (
        AddressStep
      ) : (
        <BuyerSignUpForm
          onSubmit={handleAddAddressForm}
          schema={shippingSchema}
          initialValues={INITIALVALUES}
          serverErrors={addressError}
        />
      )}
    </React.Fragment>
  );
}

export default AddressSection;
