import React, { useState, useMemo } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import NativeSelect from "@material-ui/core/NativeSelect";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import useSelector from "../../redux/utils/useStoreSelector";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

type Delivery = "pickupStation" | "doorDelivery";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
  })
);

function DeliveryMethod() {
  const [pickupState, setPickupState] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [deliveryType, setDeliveryType] = useState<Delivery>("doorDelivery");
  const [openPickupStation, setOpenPickupStation] = useState(false);

  const classes = useStyles();

  const pickupLocations = useSelector(
    ({ pickUpLocations }) => pickUpLocations.pickUpLocations
  );

  const fiteredLocation = useMemo(() => {
    return pickupLocations.filter((location) => {
      return location.state === pickupState;
    });
  }, [pickupState]);

  const handleDeliveryType = (arg: Delivery) => () => setDeliveryType(arg);

  const handleOpenPickupStation = (arg: typeof openPickupStation) => () =>
    setOpenPickupStation(arg);

  const deliveryMethodJSX = (
    <React.Fragment>
      <Typography variant="h6">Delivery Method</Typography>
      <Divider />
      <Grid container direction="column">
        <Grid item>
          <FormControlLabel
            control={<Radio />}
            value={deliveryType}
            onChange={handleDeliveryType("doorDelivery")}
            label={<Typography variant="subtitle1">Door Delivery</Typography>}
          />
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <FormControlLabel
                control={<Radio />}
                value={deliveryType}
                onChange={handleDeliveryType("pickupStation")}
                label={
                  <Typography variant="subtitle1">Pickup station</Typography>
                }
              />
            </Grid>
            {deliveryType === "pickupStation" && (
              <Grid item>
                <Button
                  onClick={handleOpenPickupStation(true)}
                  color="secondary"
                >
                  Pickup station
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );

  const pickUpLocationsSelector = (
    <Grid container spacing={1}>
      <Grid item xs={5}>
        <NativeSelect
          name="pickup-state"
          value={pickupState}
          fullWidth
          onChange={(e) => setPickupState(e.target.value)}
        >
          {pickupLocations.map((location) => (
            <option value={location.state} key={location.state}>
              {location.state}
            </option>
          ))}
        </NativeSelect>
      </Grid>
      <Grid item xs>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item xs={5}>
        <NativeSelect
          fullWidth
          name="pickup-cities"
          value={pickupCity}
          onChange={(e) => setPickupCity(e.target.value)}
        >
          {fiteredLocation.map((location) => (
            <option value={location.city}>{location.city}</option>
          ))}
        </NativeSelect>
      </Grid>
    </Grid>
  );

  return (
    <Paper className={classes.root}>
      {deliveryMethodJSX}
      <Dialog
        open={openPickupStation}
        fullWidth
        aria-labelledby="dialog-for-pickup-location"
      >
        <DialogContent>
          <Grid container direction="column" spacing={1}>
            <Grid item xs={12} container alignItems="center">
              <Grid item>
                <Typography variant="h6">
                  select a pickup location close to your area
                </Typography>
              </Grid>
              <div style={{ flexGrow: 1 }} />
              <Grid item>
                <IconButton
                  onClick={handleOpenPickupStation(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>{pickUpLocationsSelector}</Grid>
            <Grid item>
              <Divider />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}

export default DeliveryMethod;
