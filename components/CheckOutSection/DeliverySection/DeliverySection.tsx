import React, { useState, useMemo, useEffect } from "react";
import clsx from "classnames";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useStyles } from "./styles";
import Highlighter from "../Highlighter";
import CheckerIcon from "../Checker";
import { DeliverySectionProps, Delivery } from "./@types";

function DeliveryMethod(props: DeliverySectionProps) {
  const FIELDS = ["address", "city", "state", "country"];

  const [pickupState, setPickupState] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [openPickupStation, setOpenPickupStation] = useState(false);

  const classes = useStyles();

  const pickupStationCites = useMemo(() => {
    const cities = props.pickupStations
      .filter(({ state }) => state === pickupState)
      .map((state) => state.city);
    const filteredCities = new Set(cities);

    return Array.from(filteredCities);
  }, [pickupState]);

  const pickupStationStates = useMemo(() => {
    const states = props.pickupStations.map((station) => station.state);
    const filteredStates = new Set(states);

    return Array.from(filteredStates);
  }, [props.pickupStations]);

  const filteredPickupStations = useMemo(() => {
    let clonedPickupStation = props.pickupStations.slice();

    if (pickupState) {
      clonedPickupStation = clonedPickupStation.filter(({ state }) => {
        return state === pickupState;
      });
    }

    if (pickupCity) {
      clonedPickupStation = clonedPickupStation.filter(({ city }) => {
        return city === pickupCity;
      });
    }
    return clonedPickupStation;
  }, [pickupState, pickupCity]);

  const selectedPickupStation = useMemo(() => {
    return props.pickupStations.find(({ id }) => id === props.pickupStationId);
  }, [props.pickupStationId]);

  useEffect(() => {
    if (pickupStationStates.length) {
      setPickupState("Lagos");
    }
  }, []);

  const handleDeliveryType = (arg: Delivery) => () =>
    props.setDeliveryType(arg);

  const handleOpenPickupStation = (arg: typeof openPickupStation) => () =>
    setOpenPickupStation(arg);

  const handlePickupState = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPickupState(event.target.value);
    setPickupCity("");
  };

  const handlePickupCity = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPickupCity(event.target.value);
  };

  const handlePickupStation = (id?: number | string) => () => {
    if (id) props.setPickupStationId(id);
  };

  const DeliveryMethod = () => (
    <React.Fragment>
      <Typography variant="h6">Delivery Method</Typography>
      <Divider />
      <Grid container direction="column">
        <Grid item>
          <FormControlLabel
            control={<Radio checked={props.deliveryType === "doorDelivery"} />}
            value={props.deliveryType}
            onChange={handleDeliveryType("doorDelivery")}
            label={<Typography variant="subtitle1">Door Delivery</Typography>}
          />
        </Grid>
        <Grid item container alignItems="center" spacing={1}>
          <Grid item>
            <FormControlLabel
              control={
                <Radio checked={props.deliveryType === "pickupStation"} />
              }
              value={props.deliveryType}
              onChange={handleDeliveryType("pickupStation")}
              label={
                <Typography variant="subtitle1">Pickup station</Typography>
              }
            />
          </Grid>
          {props.deliveryType === "pickupStation" && (
            <Grid item>
              <Button
                variant="outlined"
                onClick={handleOpenPickupStation(true)}
                color="secondary"
                size="small"
              >
                Pickup station
              </Button>
            </Grid>
          )}
          <Grid item xs={12}>
            {selectedPickupStation && props.deliveryType === "pickupStation" && (
              <div className={classes.currentPickupStationCard}>
                <Grid container>
                  {FIELDS.map((field) => (
                    <Grid item container>
                      <Grid item xs={2}>
                        <Typography
                          variant="caption"
                          className={clsx(classes.text, classes.textColor)}
                          noWrap
                        >
                          {field}:
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="caption">
                          {selectedPickupStation[field]}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );

  const PickUpStationFilter = () => (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <TextField
          select
          onChange={handlePickupState}
          fullWidth
          color="secondary"
          label="State"
          variant="filled"
          name="pickup-states"
          value={pickupState}
          SelectProps={{
            native: true,
          }}
        >
          {pickupStationStates.length ? (
            pickupStationStates.map((state) => (
              <option value={state} key={state}>
                {state}
              </option>
            ))
          ) : (
            <option defaultValue="State">State</option>
          )}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          select
          onChange={handlePickupCity}
          fullWidth
          color="secondary"
          variant="filled"
          value={pickupCity}
          name="pickup-cities"
          SelectProps={{
            native: true,
          }}
        >
          <option value="">City</option>
          {pickupStationCites.map((city) => (
            <option value={city} key={city}>
              {city}
            </option>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );

  const PickupStations = () => (
    <React.Fragment>
      {filteredPickupStations.map((station) => (
        <Grid item xs={6} key={station.id}>
          <Highlighter
            open={station.id === props.pickupStationId}
            close={station.id !== props.pickupStationId}
          >
            <CardActionArea
              className={classes.pickupSite}
              onClick={handlePickupStation(station.id)}
            >
              <Grid container spacing={1}>
                <Grid item xs={11}>
                  {FIELDS.map((field) => (
                    <Grid container spacing={1}>
                      <Grid item container>
                        <Grid item xs={2}>
                          <Typography
                            variant="caption"
                            className={clsx(classes.text, classes.textColor)}
                          >
                            {field}:
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="subtitle2">
                            {station[field]}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={1}>
                  <CheckerIcon
                    open={station.id === props.pickupStationId}
                    close={station.id !== props.pickupStationId}
                  />
                </Grid>
              </Grid>
            </CardActionArea>
          </Highlighter>
        </Grid>
      ))}
    </React.Fragment>
  );

  return (
    <Paper className={classes.root}>
      <DeliveryMethod />
      <Dialog
        open={openPickupStation}
        fullWidth
        maxWidth="md"
        scroll="paper"
        aria-labelledby="pickup-location"
        aria-describedby="pickup-locations"
      >
        <DialogTitle id="pickup-location">
          <Grid container spacing={1}>
            <Grid item xs={12} container alignItems="center">
              <Grid item>
                <Typography variant="h6">
                  Select a pickup location close to your area
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
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <PickUpStationFilter />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers id="pickup-locations">
          <Grid container spacing={1} alignItems="stretch">
            <PickupStations />
          </Grid>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}

export default DeliveryMethod;
