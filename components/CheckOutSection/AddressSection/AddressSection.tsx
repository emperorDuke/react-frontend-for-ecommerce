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
import IconButton from "@material-ui/core/IconButton";
import * as actions from "../../../redux/actionCreators/AddressActions";
import * as T from "./@types";
import { BuyerSignUpForm } from "../../BuyerSignUpForm";
import { flatten, useRequest } from "../../../utils";
import { useDispatch } from "react-redux";
import { apiUrl as path } from "../../../services";
import { serialize } from "object-to-formdata";
import { useStyles } from "./styles";
import { constructShippingData, formLabels } from "./utils";
import Highlighter from "../Highlighter";
import CheckerIcon from "../Checker";
import { addAddress } from "../../../redux/actionCreators/AddressActions";
import { shippingSchema } from "./schema";

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
        .filter((key) => formLabels({ excludeID: false }).includes(key))
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
      dispatch(addAddress(onAddressAdd.data));
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
    const data = onAddressDefault.data as actions.ShippingDetailType;

    if (status === "success") {
      dispatch(actions.updateAddress(data));
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

  const handleEditAddressForm = (values: any, id?: string | number) => {
    const shippingObj = constructShippingData(values);

    onAddressEdit.request({
      method: "PATCH",
      url: path("updateShippingDetail", id),
      data: serialize(shippingObj, { indices: true }),
      headers: {
        "Content-type": "multipart/form-data",
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
        "Content-type": "multipart/form-data",
      },
    });
  };

  const AddressDialogForm = (props: T.AddressDialogFormProps) => {
    return (
      <Dialog
        open={props.dialogState}
        aria-labelledby="address-title"
        aria-aria-describedby="dialog-for-new-address"
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
                <IconButton onClick={() => props.setDialogState(false)}>
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
  };

  const DefaultAddress = () => (
    <React.Fragment>
      <Grid item container alignItems="center">
        <Grid item>
          <Typography variant="h6">Default Address</Typography>
        </Grid>
        <div style={{ flexGrow: 1 }} />
        <Grid item>
          <Button
            startIcon={<AddIcon />}
            color="primary"
            variant="outlined"
            onClick={() => setOpenNewAddress(true)}
          >
            add address
          </Button>
          <AddressDialogForm
            dialogState={openNewAddress}
            setDialogState={setOpenNewAddress}
            schema={shippingSchema}
            onSubmit={handleAddAddressForm}
            initialValues={INITIALVALUES}
            serverErrors={addressError}
          />
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
                {formLabels({}).map((key) => (
                  <Grid item container spacing={1} wrap="nowrap" key={key}>
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        className={clsx(classes.text, classes.textColor)}
                        noWrap
                      >
                        {removeUnderscore(key)}:
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography
                        variant="body1"
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
            </Grid>
          </Grid>
        </div>
      </Grid>
    </React.Fragment>
  );

  const OtherAddresses = () => (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant="h6">Addresses</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid
        item
        xs={12}
        container
        spacing={1}
        className={classes.addressWrapper}
      >
        {addresses &&
          addresses.map((address) => (
            <Grid item xs={4} key={address.shipping_id}>
              <Highlighter
                open={shippingId === address.shipping_id}
                close={shippingId !== address.shipping_id}
              >
                <div className={classes.addressCard}>
                  <Grid container>
                    <Grid item xs={11}>
                      {formLabels({ minimal: true }).map((key) => (
                        <Grid container spacing={1} wrap="nowrap" key={key}>
                          <Grid item>
                            <Typography
                              variant="caption"
                              noWrap
                              className={clsx(classes.text, classes.textColor)}
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
                    <Grid item xs={1}>
                      <CheckerIcon
                        open={shippingId === address.shipping_id}
                        close={shippingId !== address.shipping_id}
                      />
                    </Grid>
                    <Grid item xs={12} container spacing={2}>
                      <Grid item>
                        <Button
                          size="small"
                          color="primary"
                          aria-label="delete"
                          onClick={handleAddressDelete(address.shipping_id)}
                          startIcon={<DeleteIcon />}
                        >
                          delete
                        </Button>
                      </Grid>
                      {filterdDefaultAddress &&
                        filterdDefaultAddress.id !== address.shipping_id && (
                          <Grid item>
                            <Button
                              variant="outlined"
                              size="small"
                              color="primary"
                              aria-label="mark as default"
                              onClick={handleMarkAsDefault(address.shipping_id)}
                            >
                              mark as default
                            </Button>
                          </Grid>
                        )}
                    </Grid>
                  </Grid>
                </div>
              </Highlighter>
            </Grid>
          ))}
      </Grid>
    </React.Fragment>
  );

  const AddressStep = () => (
    <Grid container spacing={1}>
      <DefaultAddress />
      {addresses && <OtherAddresses />}
    </Grid>
  );

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={1}>
        <Grid item container>
          <Grid item xs={12}>
            {defaultAddress ? (
              <AddressStep />
            ) : (
              <BuyerSignUpForm
                onSubmit={handleAddAddressForm}
                schema={shippingSchema}
                initialValues={INITIALVALUES}
                serverErrors={addressError}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default React.memo(AddressSection);
