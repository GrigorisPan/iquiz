import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  continueButton: {
    ...theme.typography.secondaryButton,
    borderColor: theme.palette.common.blue,
    color: theme.palette.common.blue,
    height: 40,
    width: 145,
    marginTop: '1em',
    marginLeft: '1em',
  },
  mainContainer: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
  },
}));

export default function QuestionsForm() {
  const classes = useStyles();

  return (
    <Grid container alignItems='center' className={classes.mainContainer}>
      <Typography variant='h6' gutterBottom>
        Συμπλήρωση Κωδικού OTP
      </Typography>
      <Grid item container direction='row' alignItems='center' justify='center'>
        <Grid item>
          <TextField required label='OTP' id='otp' autoComplete='false' />
        </Grid>
        <Button variant='outlined' className={classes.continueButton}>
          Υποβολή
        </Button>
      </Grid>
    </Grid>
  );
}
