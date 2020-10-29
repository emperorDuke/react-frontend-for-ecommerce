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
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CheckIcon from "@material-ui/icons/Check";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import {
  ShippingDetailType,
  updateAddress,
  requestAddress,
} from "../../redux/actionCreators/AddressActions";
import { BuyerSignUpForm, BuyerSignUpFormProps } from "../BuyerSignUpForm";
import { flatten, useRequest } from "../../utils";
import { useDispatch } from "react-redux";
import { apiUrl as path } from "../../services";
import { serialize } from "object-to-formdata";

type FormPropsRequired = Pick<
  BuyerSignUpFormProps,
  "initialValues" | "onSubmit" | "schema" | "serverErrors"
>;

type InitialValues = BuyerSignUpFormProps["initialValues"];

interface Props extends FormPropsRequired {
  defaultAddress: ShippingDetailType;
  addresses?: ShippingDetailType[];
}

interface AddressDialogFormProps extends FormPropsRequired {
  dialogState: boolean;
  setDialogState: (param: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
      width: "100%",
    },
    text: {
      textTransform: "capitalize",
    },
    textColor: {
      color: theme.palette.grey[500],
    },
    tooltip: {
      ...theme.typography.caption,
      textTransform: "capitalize",
    },
  })
);

/**
 * sort form fields
 */
const formLabels = ({ minimal = false, excludeID = true }) => {
  const LABELS = ["first_name", "last_name", "address", "phone_number"];
  const EXTRALABELS = ["city", "state", "country"];

  let value = LABELS;

  if (!minimal) {
    value = LABELS.concat(EXTRALABELS);
  }

  if (!excludeID) {
    value = value.concat(["id"]);
  }

  return value;
};

/**
 * unflattens the shipping object
 * @param values object
 */
export function constructShippingData(values: any) {
  const addressObj: any = {};
  const shippingObj: any = {};
  const addressFields = ["address", "city", "state", "country"];

  const filterFunc = (key: string) => {
    if (addressFields.includes(key)) {
      return false;
    } else {
      return true;
    }
  };

  addressFields.forEach((field) => {
    addressObj[field] = values[field];
  });

  Object.keys(values)
    .filter(filterFunc)
    .forEach((key) => {
      shippingObj[key] = values[key];
    });

  shippingObj["address"] = addressObj;

  return shippingObj as ShippingDetailType;
}

/**
 * Dialog for the shipping form
 * @param props
 */
function AddressDialogForm(props: AddressDialogFormProps) {
  return (
    <Dialog
      open={props.dialogState}
      aria-labelledby="dialog-for-new-address"
      fullWidth
    >
      <DialogContent>
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
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <BuyerSignUpForm
              onSubmit={props.onSubmit}
              schema={props.schema}
              initialValues={props.initialValues}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default function DefaultAddresses(props: Props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openNewAddress, setOpenNewAddress] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [editError, setEditError] = useState<any>({});
  const onAddressDefault = useRequest({ auth: true });
  const onAddressEdit = useRequest({ auth: true });
  const onAddressDelete = useRequest({ auth: true });

  const defaultAddress = useMemo(() => {
    const { defaultAddress } = props;
    const flatObject = flatten(defaultAddress);

    flatObject["shipping_id"] = defaultAddress.id;
    return flatObject;
  }, [props.defaultAddress]);

  const addresses = useMemo(() => {
    const { addresses } = props;
    return (
      addresses &&
      (addresses
        .filter((address) => address.id !== defaultAddress.shipping_id)
        .map((address) => {
          const flatObject = flatten(address);
          flatObject["shipping_id"] = address.id;
          return flatObject;
        }) as InitialValues[])
    );
  }, [props.addresses, defaultAddress]);

  const defaultAddressData = useMemo(() => {
    const obj: any = {};

    Object.keys(defaultAddress)
      .filter((key) => formLabels({ excludeID: false }).includes(key))
      .forEach((key) => {
        obj[key] = defaultAddress[key];
      });

    return obj as InitialValues;
  }, [defaultAddress]);

  useEffect(() => {
    const status = onAddressEdit.status;
    const error = onAddressEdit.error;
    const data = onAddressEdit.data;

    if (status === "success" && data) {
      dispatch(updateAddress(data));
    }
    if (status === "failed" && error) {
      setEditError(error);
    }
  }, [onAddressEdit.status]);

  useEffect(() => {
    const status = onAddressDefault.status;

    if (status === "success") {
      dispatch(updateAddress(onAddressDefault.data));
    }
  }, [onAddressDefault.status]);

  useEffect(() => {
    const status = onAddressDelete.status;

    if (status === "success") {
      dispatch(requestAddress(path("getShippingDetails")));
    }

    if (status === "failed") {
      console.error("failed to delete");
    }
  }, [onAddressDelete.status]);

  const removeUnderscore = (key: string) => {
    return key.split("_").join(" ");
  };

  const handleEditAddressForm = (values: any, id?: string) => {
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

  const handleMarkAsDefault = (id?: string) => () => {
    onAddressDefault.request({
      method: "PATCH",
      url: path("updateShippingDetail", id),
      data: JSON.stringify({
        default: true,
      }),
    });
  };

  const handleAddressDelete = (id?: string) => () => {
    onAddressDelete.request({
      method: "DELETE",
      url: path("updateShippingDetail", id),
    });
  };

  const defaultAddressJSX = (
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
            schema={props.schema}
            onSubmit={props.onSubmit}
            initialValues={props.initialValues}
            serverErrors={props.serverErrors}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.root}>
          <Grid container>
            <Grid item container xs={10}>
              <Grid item container xs={12} spacing={2}>
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
                        {defaultAddress[key]}
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
              <AddressDialogForm
                dialogState={openEditAddress}
                setDialogState={setOpenEditAddress}
                schema={props.schema}
                onSubmit={handleEditAddressForm}
                initialValues={defaultAddressData}
                serverErrors={editError}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </React.Fragment>
  );

  return (
    <Grid container spacing={1}>
      {defaultAddressJSX}
      <Grid item xs={12}>
        <Typography variant="h6">Addresses</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item container spacing={1}>
        {addresses &&
          addresses.map((address) => (
            <Grid item xs={4} key={address.shipping_id}>
              <div className={classes.root}>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
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
                  <Grid item xs={2}>
                    <Tooltip
                      title={<p className={classes.tooltip}>Delete Address</p>}
                      enterDelay={5}
                      enterTouchDelay={5}
                      leaveTouchDelay={80}
                      leaveDelay={80}
                    >
                      <IconButton
                        size="small"
                        aria-label="delete"
                        onClick={handleAddressDelete(address.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item container spacing={1} xs={12}>
                    <Grid item>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        aria-label="mark as default"
                        startIcon={<CheckIcon />}
                        onClick={handleMarkAsDefault(address.id)}
                      >
                        mark as default
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
