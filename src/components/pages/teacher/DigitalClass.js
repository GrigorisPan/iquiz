import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listDigitalClass } from '../../../actions/digitalClassActions';
import DigitalClassCard from './components/DigitalClassCard';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';
import Grid from '@material-ui/core/Grid';

import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Icon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  loginButton: {
    ...theme.typography.mainButton,
    borderRadius: '50px',
    width: '240px',
    height: '40px',
    alignItems: 'center',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  specialText: {
    color: theme.palette.common.orange,
  },
  button: {
    ...theme.typography.secondaryButton,
    color: theme.palette.common.blue,
  },
  root: {
    maxWidth: '100%',
  },
}));

export default function DigitalClass() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const digitalClass = useSelector((state) => state.digitalClass);
  console.log(digitalClass);
  const { loading, error, dClasses } = digitalClass;

  useEffect(() => {
    dispatch(listDigitalClass(1));
  }, [dispatch]);

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      className={classes.mainContainer}
    >
      <Grid item xs={12}>
        <Typography
          gutterBottom
          variant={matchesXS ? 'h4' : 'h3'}
          style={{
            marginBottom: '1em',
          }}
        >
          Δημιούργησε τώρα μια{' '}
          <span className={classes.specialText}>Ψηφιακή Τάξη</span>
        </Typography>
        <Grid item align='center'>
          <Button onClick={() => setOpen(true)}>
            <Icon
              style={{
                color: '#6fbf73',
                fontSize: '3em',
              }}
            >
              <span>add_box</span>
            </Icon>
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? '1em' : '3em',
            paddingBottom: matchesXS ? '1em' : '3em',
            paddingLeft: matchesXS ? '0em' : '5em',
            paddingRight: matchesXS ? '0em' : '5em',
          },
        }}
      >
        <DialogContent>
          <Grid container direction='column'>
            <Typography
              gutterBottom
              variant={matchesXS ? 'h4' : 'h3'}
              style={{
                marginBottom: '1em',
              }}
            >
              Δημιουργία{' '}
              <span className={classes.specialText}>Ψηφιακή Τάξη</span>
            </Typography>
            <Grid
              item
              container
              justify='center'
              alignItems='center'
              direction='column'
              spacing={5}
            >
              <Grid item>
                <TextField
                  required
                  label='Τίτλος'
                  id='title'
                  autoComplete='false'
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  label='Περιγραφή'
                  id='Περιγραφή'
                  multiline
                  fullWidth
                  rows={4}
                  variant='filled'
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems='center'
              justify='center'
              direction='row'
              style={{
                marginTop: '2em',
              }}
            >
              <Grid item>
                <Button
                  onClick={() => setOpen(false)}
                  className={classes.button}
                >
                  Πίσω
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' className={classes.loginButton}>
                  Δημοσίευση
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Grid item container xs={12} justify='center'>
        <Divider
          style={{
            marginTop: '2em',
            marginBottom: '2em',
            width: '90%',
          }}
        />
        <Typography
          variant='h4'
          style={{
            marginBottom: '2em',
          }}
        >
          Οι Ψηφιακές σου <span className={classes.specialText}> Τάξεις</span>
        </Typography>
      </Grid>
      {loading ? (
        <Loader />
      ) : error ? (
        <Grid container justify='center'>
          <Message severity='error'>{error}</Message>
        </Grid>
      ) : !dClasses ? (
        <Grid container justify='center'>
          <Message severity='info'>Δεν υπάρχουν ψηφιακές τάξεις</Message>
        </Grid>
      ) : (
        dClasses.map((dclass) => (
          <DigitalClassCard key={dclass.id} dclass={dclass} />
        ))
      )}
    </Grid>
  );
}
