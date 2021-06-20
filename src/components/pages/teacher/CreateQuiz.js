import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import DataForm from './components/DataForm';
import QuestionsForm from './components/QuestionsForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    minWidth: '100%',
  },
  fixedHeight: {
    height: '100%',
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    [theme.breakpoints.down('xs')]: {
      '&.MuiStepper-horizontal': {
        flexDirection: 'column',
        alignItems: '',
      },
      '&.MuiStepper-root': {
        margin: '10px',
        display: 'block',
      },
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    ...theme.typography.secondaryButton,
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
}));
const steps = ['Πληροφορίες Κουίζ', 'Ερωτήσεις Κουίζ', 'Προεπισκόπηση'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <DataForm />;
    case 1:
      return <QuestionsForm />;
    case 2:
      return;
    default:
      throw new Error('Unknown step');
  }
}
export default function CreateQuiz() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Grid container direcrion='column' spacing={0} justify='center'>
      <Grid item container xs={12} sm={10} md={7}>
        <Paper className={fixedHeightPaper}>
          <Typography
            component='h1'
            variant='h4'
            align='center'
            style={{ marginBottom: '1em' }}
          >
            Δημιουργία Κουίζ
          </Typography>

          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Grid item>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant='h5' gutterBottom>
                    Ευχαριστούμε.
                  </Typography>
                  <Typography variant='subtitle1'>
                    Το κουίζ ολοκληρώθηκε με επιτυχία.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}

                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        color='primary'
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Πίσω
                      </Button>
                    )}
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1
                        ? 'Ολοκλήρωση'
                        : 'Επόμενο'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
