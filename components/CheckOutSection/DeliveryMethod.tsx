import React, { useState, useMemo } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import NativeSelect from "@material-ui/core/NativeSelect";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import useSelector from "../../redux/utils/useStoreSelector";

type Delivery = "pickupStation" | "doorDelivery";

function DeliveryMethod() {
  const [pickupState, setPickupState] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [deliveryType, setDeliveryType] = useState<Delivery>("doorDelivery");
  const [openPickupStation, setOpenPickupStation] = useState(false);

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
      <Typography variant="h4">Delivery Method</Typography>
      <Divider />
      <Grid container direction="column">
        <Grid item>
          <FormControlLabel
            control={<Radio />}
            value={deliveryType}
            onChange={handleDeliveryType("doorDelivery")}
            label={<Typography variant="h6">Door Delivery</Typography>}
          />
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <FormControlLabel
                control={<Radio />}
                value={deliveryType}
                onChange={handleDeliveryType("pickupStation")}
                label={<Typography variant="h6">Pickup station</Typography>}
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

  const pickUpLocationsJSX = (
    <Grid container spacing={1}>
      <Grid item>
        <NativeSelect
          name="pickup-state"
          value={pickupState}
          onChange={(e) => setPickupState(e.target.value)}
        >
          {pickupLocations.map((location) => (
            <option value={location.state}>{location.state}</option>
          ))}
        </NativeSelect>
      </Grid>
      <Grid item>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item>
        <NativeSelect
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
    <Paper>
      {deliveryMethodJSX}
      <Dialog
        open={openPickupStation}
        onClose={handleOpenPickupStation(false)}
        aria-labelledby="dialog-for-pickup-location"
      >
        <DialogContent>
          <DialogTitle>Select a Pickup Location</DialogTitle>
          <DialogContentText>
            <Typography variant="h6">
              select a pickup location close to your area
            </Typography>
          </DialogContentText>
          {pickUpLocationsJSX}
          <DialogActions>
            <Button
              startIcon={<CloseIcon />}
              onClick={handleOpenPickupStation(false)}
              color="secondary"
            >
              close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}

export default DeliveryMethod;
