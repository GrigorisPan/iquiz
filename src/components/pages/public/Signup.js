import React from 'react';
import { TextField, Button, FormControl } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '88vh',
  },
  mainContainer: {
    minHeight: '38em',
    maxHeight: '88vh',
    width: '35em',
    padding: '3em 1em',
    boxShadow: '0px 0px 8px 5px rgba(0,0,0,0.2)',
    borderRadius: '10px',
  },
  formControl: {
    minWidth: '11em',
    marginTop: '1.3em',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0em',
    },
  },
  signButton: {
    ...theme.typography.mainButton,
    borderRadius: '50px',
    width: '250px',
    height: '45px',
    marginTop: '5em',
    [theme.breakpoints.down('xs')]: {
      marginTop: '2em',
    },
    alignItems: 'center',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

export default function LandingPage() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      className={classes.container}
    >
      <Grid
        item
        container
        direction='column'
        alignItems='center'
        justify='center'
        className={classes.mainContainer}
      >
        <Grid item>
          <Typography
            variant={matchesXS ? 'h3' : 'h2'}
            style={{ lineHeight: 1 }}
            align='center'
          >
            Εγγραφή
          </Typography>
          <Typography
            variant='body1'
            align='center'
            style={{ marginTop: '0.8em' }}
          >
            Μάθε τα πάντα παίζοντας!
          </Typography>
        </Grid>
        <Grid item>
          <Grid item container direction='column'>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id='type-user-select-label'>
                  Κατηγορία χρήστη
                </InputLabel>
                <Select labelId='type-user-select-label' id='user-select'>
                  <MenuItem>Εκπαιδευτικός</MenuItem>
                  <MenuItem>Εκπαιδευόμενος</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                label='Όνομα χρήστη'
                id='name'
                style={{ marginTop: '1.3em' }}
                autoComplete='false'
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label='Ηλεκτρονικό ταχυδρομείο'
                id='email'
                style={{ marginTop: '1.3em' }}
                fullWidth
                autoComplete='false'
              />
            </Grid>
            <Grid item>
              <TextField
                label='Κωδικός'
                id='password'
                style={{ marginTop: '1.3em' }}
                fullWidth
                type='password'
                autoComplete='false'
              />
            </Grid>
            <Grid item>
              <TextField
                label='Επιβεβαίωση κωδικού'
                id='Confirm Password'
                style={{ marginTop: '1.3em' }}
                fullWidth
                type='password'
                autoComplete='false'
              />
            </Grid>
            <Grid item>
              <Grid item container justify='center'>
                <Button variant='contained' className={classes.signButton}>
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
