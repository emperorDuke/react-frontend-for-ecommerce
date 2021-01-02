import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import useSelector from "../../redux/utils/useStoreSelector";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import ChevronRightIcon from "@material-ui/icons/ChevronRightOutlined";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { DeliverySection, Delivery } from "./DeliverySection";
import { AddressSection } from "./AddressSection";
import PaymentMethod from "./PaymentMethod";
import Typography from "@material-ui/core/Typography";
import { requestStatus$, Status } from "../../utils";
import { OrderSummary } from "./Orders";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderSummary: {
      height: theme.spacing(50),
      padding: theme.spacing(1),
    },
    orderText: {
      textAlign: "center",
      textTransform: "capitalize",
    },
    root: {
      padding: theme.spacing(2),
    },
  })
);

function CheckOut() {
  const shipping = useSelector(({ addressBook }) => addressBook.shipping);
  const pickupStations = useSelector(
    ({ pickUpLocations }) => pickUpLocations.pickUpLocations
  );
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [status, setStatus] = useState<Status>("idle");
  const [pickupLocationId, setPickupLocationId] = useState<string | number>(-1);
  const [deliveryType, setDeliveryType] = useState<Delivery | undefined>();
  const classes = useStyles();

  useEffect(() => {
    if (getDefaultAddress() && activeStep === 0) {
      handleComplete();
      handleNext();
    }
  }, []);

  const getDefaultAddress = () => {
    if (shipping.length) {
      return shipping.find((s) => !!s.default);
    }
  };

  const getSteps = () => {
    return ["Address Details", "Delivery Method", "Payment Method"];
  };

  const steps = getSteps();

  const isLastStep = () => activeStep === totalSteps() - 1;

  const totalSteps = () => steps.length;

  const completedSteps = () => completed.size;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const isStepComplete = (step: number) => completed.has(step);

  const handleStep = (step: number) => () => setActiveStep(step);

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);
  };

  const getDefaultState = () => {
    const defaultAddress = getDefaultAddress();

    if (defaultAddress) {
      return defaultAddress.address.state;
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AddressSection shipping={shipping} />;
      case 1:
        return (
          <DeliverySection
            pickupStationId={pickupLocationId}
            setPickupStationId={setPickupLocationId}
            pickupStations={pickupStations}
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
            defaultState={getDefaultState()}
          />
        );
      case 2:
        return <PaymentMethod />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <Container>
      <Grid container direction="column" spacing={1}>
        <Grid item />

        <Grid item container spacing={1}>
          <Grid item xs={9}>
            <Typography variant="h6" gutterBottom>
              Checkout
            </Typography>
            <Paper className={classes.root}>
              <Stepper activeStep={activeStep} alternativeLabel nonLinear>
                {steps.map((step, index) => {
                  return (
                    <Step key={step}>
                      <StepButton
                        onClick={handleStep(index)}
                        completed={isStepComplete(index)}
                      >
                        {step}
                      </StepButton>
                    </Step>
                  );
                })}
              </Stepper>
              <Grid container direction="column" spacing={1}>
                <Grid item xs={12}>
                  {getStepContent(activeStep)}
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} container spacing={2}>
                  <div style={{ flexGrow: 1 }} />
                  {activeStep !== 0 && (
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleBack}
                      >
                        back
                      </Button>
                    </Grid>
                  )}
                  <Grid item>
                    <Button
                      variant="contained"
                      endIcon={<ChevronRightIcon />}
                      color="primary"
                      onClick={handleNext}
                    >
                      next
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs>
            {/* <OrderSummary /> */}
          </Grid>
        </Grid>

        <Grid item />
      </Grid>
    </Container>
  );
}

export default CheckOut;
