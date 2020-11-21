import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import useSelector from "../../redux/utils/useStoreSelector";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { DeliverySection, Delivery } from "./DeliverySection";
import { AddressSection } from "./AddressSection";
import PaymentMethod from "./PaymentMethod";
import Typography from "@material-ui/core/Typography";
import { requestStatus$, Status } from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderSummary: {
      minHeight: theme.spacing(50),
    },
    orderText: {
      textAlign: "center",
      textTransform: "capitalize",
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
  const [deliveryType, setDeliveryType] = useState<Delivery | null>(null);
  const classes = useStyles();

  useEffect(() => {
    const defaultAddress = () => {
      if (shipping.length) {
        return shipping.find((s) => !!s.default);
      }
    };

    if (defaultAddress() && activeStep === 0) {
      handleComplete();
      handleNext();
    }

    const status$ = requestStatus$.subscribe(setStatus);

    return () => status$.unsubscribe();
  }, []);

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

        <Grid item container spacing={1} direction="row">
          <Grid item xs={9}>
            <Paper>
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
              <div>{getStepContent(activeStep)}</div>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.orderSummary}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    className={classes.orderText}
                    component="h4"
                  >
                    order summary
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div></div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Grid item />
      </Grid>
    </Container>
  );
}

export default CheckOut;
