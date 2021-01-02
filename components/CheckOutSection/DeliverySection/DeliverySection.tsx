import React, { useState, useMemo, useEffect } from "react";
import clsx from "classnames";
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
import CheckerIcon from "../CheckerIcon";
import { DeliverySectionProps, Delivery } from "./@types";

function DeliveryMethod(props: DeliverySectionProps) {
  const FIELDS = ["address", "city", "state", "country", "phone_number"];
  const isPickupStation = props.deliveryType === "pickupStation";

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
    if (pickupStationStates.length && props.defaultState) {
      setPickupState(props.defaultState);
    }
  }, []);

  const handleDeliveryType = (param: Delivery) => () => {
    props.setDeliveryType(param);
  };

  const handleOpenPickupStation = (param: boolean) => () => {
    setOpenPickupStation(param);
  };

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

  const removeUnderscore = (key: string) => {
    return key.split("_").join(" ");
  };

  const DeliveryMethod = (
    <React.Fragment>
      <Typography variant="subtitle1">Your Delivery Options</Typography>
      <Divider />
      <Grid container direction="column" spacing={1}>
        <Grid item container alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Radio checked={!isPickupStation} />}
              value={props.deliveryType}
              onChange={handleDeliveryType("doorDelivery")}
              label={<Typography variant="subtitle1">Door Delivery</Typography>}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.pickupStationInfo}>
              Delivered between Thursday 3 Dec and Monday 7 Dec for ₦ 1,500 *
              Large items (e.g. Freezers) may arrive 2 business days later than
              other products. Kindly confirm your delivery address is accessible
              before placing your order
            </div>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" spacing={1}>
          <Grid item>
            <FormControlLabel
              control={<Radio checked={isPickupStation} />}
              value={props.deliveryType}
              onChange={handleDeliveryType("pickupStation")}
              label={
                <Typography variant="subtitle1">
                  Pickup station (Cheaper Shipping Fees)
                </Typography>
              }
            />
          </Grid>
          {isPickupStation && (
            <Grid item>
              <Button
                variant="outlined"
                onClick={handleOpenPickupStation(true)}
                color="secondary"
                size="small"
              >
                select Pickup station
              </Button>
            </Grid>
          )}
          <Grid item xs={12}>
            <div className={classes.pickupStationInfo}>
              <Grid container spacing={1} direction="column">
                <Grid item xs={6}>
                  <div className={classes.extraInfo}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} container>
                        <Grid item xs={1}>
                          <Typography variant="body2" component="span">
                            -
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="body2" component="p">
                            Your package will be available for pick-up between{" "}
                            <span className={classes.font}>
                              Friday 27 Nov to Wednesday 2 Dec
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} container>
                        <Grid item xs={1}>
                          <Typography variant="body2" component="span">
                            -
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="body2" component="p">
                            Select pick-up station to enjoy - Cheaper shipping
                            fees + stand a chance to win 10K shopping voucher -
                            Scheduled pickup at your own convenience
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                {selectedPickupStation && isPickupStation && (
                  <React.Fragment>
                    <Grid item xs={12} container spacing={1}>
                      <Grid item xs={6}>
                        <div className={classes.currentPickupStationCard}>
                          <Grid container>
                            {FIELDS.map((field) => (
                              <Grid item container spacing={3} key={field}>
                                <Grid item xs={3}>
                                  <Typography
                                    variant="caption"
                                    noWrap
                                    className={clsx(
                                      classes.text,
                                      classes.textColor
                                    )}
                                  >
                                    {removeUnderscore(field)}:
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
                      </Grid>
                      <Grid item xs>
                        <div className={classes.padding}>
                          <Typography
                            variant="body2"
                            gutterBottom
                            component="p"
                          >
                            We are open Mon-Fri 8AM-6PM; Sat 9am-4pm.
                          </Typography>
                          <Typography
                            variant="body2"
                            gutterBottom
                            component="p"
                          >
                            We accept Cash On Delivery, Debit Card and Bank
                            Transfer.
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                )}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );

  const PickUpStationFilter = (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <TextField
          select
          onChange={handlePickupState}
          fullWidth
          size="small"
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
          size="small"
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

  const PickupStations = (
    <Grid container spacing={1} alignItems="stretch">
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
                    <Grid container spacing={1} key={field}>
                      <Grid item container>
                        <Grid item xs={3}>
                          <Typography
                            variant="caption"
                            className={clsx(classes.text, classes.textColor)}
                          >
                            {removeUnderscore(field)}:
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
    </Grid>
  );

  return (
    <React.Fragment>
      {DeliveryMethod}
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
                <Typography variant="h6">Select a pickup station</Typography>
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
              {PickUpStationFilter}
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers id="pickup-locations">
          {PickupStations}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default DeliveryMethod;
