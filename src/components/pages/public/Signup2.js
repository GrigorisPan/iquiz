import React from 'react';
import { Grid, TextField, Paper, Button, FormControl } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '88vh',
    outline: '0',
    position: 'relative',
    [theme.breakpoints.down('lg')]: {
      marginTop: '3em',
      marginBottom: '3em',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '1.5em',
      marginBottom: '1.5em',
    },
  },
  paperStyle: {
    padding: 30,
    height: '35em',
    width: '21em',
    borderRadius: 15,
    position: 'absolute',
    marginTop: '28em',
    marginBottom: '25em',
    [theme.breakpoints.down('md')]: {
      padding: 25,
      height: '30em',
      width: '21em',
    },
    [theme.breakpoints.down('xs')]: {
      padding: 25,
      height: '30em',
      width: '16em',
    },
  },
  formControl: {
    minWidth: '11em',
    marginTop: '1.3em',
    [theme.breakpoints.down('md')]: {
      marginTop: '0em',
    },
  },
  signButton: {
    ...theme.typography.moreButton,
    borderRadius: '50px',
    width: '250px',
    height: '45px',
    marginTop: '5em',
    [theme.breakpoints.down('md')]: {
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
  const test = true;
  return (
    <form>
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='center'
        className={classes.mainContainer}
      >
        <Paper elevation={10} className={classes.paperStyle}>
          <Grid item>
            <Typography variant='h2' style={{ lineHeight: 1 }} align='center'>
              Εγγραφή
            </Typography>
            <Typography
              variant='body1'
              align='center'
              style={{ marginTop: '1em' }}
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
                  label='Name'
                  id='name'
                  style={{ marginTop: '1em' }}
                  autoComplete='false'
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label='Email'
                  id='email'
                  style={{ marginTop: '1em' }}
                  fullWidth
                  autoComplete='false'
                />
              </Grid>
              <Grid item>
                <TextField
                  label='Password'
                  id='password'
                  style={{ marginTop: '1em' }}
                  fullWidth
                  type='password'
                  autoComplete='false'
                />
              </Grid>
              <Grid item>
                <TextField
                  label='Confirm Password'
                  id='Confirm Password'
                  style={{ marginTop: '1em' }}
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
        </Paper>
      </Grid>
    </form>
  );
}
