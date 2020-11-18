import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { useRouter } from "next/router";
import DeliveryMethod from "./DeliveryMethod";
import AddressSection from "./AddressSection";
import PaymentMethod from "./PaymentMethod";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stepperRoot: {
      minHeight: theme.spacing(50),
    },
  })
);

const getSteps = () => {
  return ["Address Details", "Delivery Method", "Payment Method"];
};


function CheckOut() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const dispatch = useDispatch();
  const classes = useStyles();

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

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AddressSection />;
      case 1:
        return <DeliveryMethod />;
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
            <Paper className={classes.stepperRoot}>
              <Typography variant="h6">order summary</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid item />
      </Grid>
    </Container>
  );
}

export default CheckOut;
