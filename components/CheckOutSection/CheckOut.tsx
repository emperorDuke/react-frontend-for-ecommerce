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
import useSelector from "../../redux/utils/useStoreSelector";
import { useRouter } from "next/router";
import { post } from "../../redux/actionCreators/PostActions";
import { orderSuccess } from "../../redux/actionCreators/OrderActions";
import DeliveryMethod from "./DeliveryMethod";
import AddressSection from "./AddressSection";
import PaymentMethod from "./PaymentMethod";

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

function CheckOut() {
  const router = useRouter();
  const [postingState, setPostingState] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const dispatch = useDispatch();
  const classes = useStyles();

  const incomingPosts = useSelector(({ posts }) => posts);

  useEffect(() => {
    if (incomingPosts.operations.postItem.status === post.POST_ITEM) {
      setPostingState({
        error: null,
        loading: true,
        hasLoaded: false,
        data: null,
      });
    } else if (
      incomingPosts.operations.postItem.status === post.POST_SUCCESSFUL
    ) {
      dispatch(orderSuccess(incomingPosts.sucessMessage));
      setPostingState({
        error: null,
        loading: false,
        hasLoaded: true,
        data: incomingPosts.sucessMessage,
      });
    } else if (
      incomingPosts.operations.postItem.status === post.POSTING_FAILED
    ) {
      setPostingState({
        error: incomingPosts.operations.postItem.responseError,
        loading: false,
        hasLoaded: true,
        data: null,
      });
    }
  }, [incomingPosts]);

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

  return (
    <Container>
      <Grid container direction="column" spacing={1}>
        <Grid item />

        <Grid item container spacing={1} direction="row">
          <Grid item xs={8}>
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
        </Grid>

        <Grid item />
      </Grid>
    </Container>
  );
}

export default CheckOut;
