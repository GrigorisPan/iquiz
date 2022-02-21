import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Grid, makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';

import {
  checkCanPlayClean,
  fetchingQuestions,
} from '../../../actions/gameActions';
import Message from '../../ui/Message';
import Loader from '../../ui/Loader';

const useStyles = makeStyles((theme) => ({
  specialText: {
    color: theme.palette.common.orange,
  },
  continuousButton: {
    ...theme.typography.mainButton,
    backgroundColor: '#4caf50',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#6fbf73',
    },
  },
  button: {
    ...theme.typography.secondaryButton,
    color: theme.palette.common.blue,
    fontSize: '1.2em',
  },
  textRules: {
    fontSize: '1.15em',
  },
}));

export default function RulesModal({ open, setOpen, handleClose }) {
  const classes = useStyles();
  const theme = useTheme();
  let { id } = useParams();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();

  const checkPlay = useSelector((state) => state.checkPlay);
  const { loading, canPlay } = checkPlay;

  return (
    <Grid container direction='column' spacing={3}>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? '1em' : '3em',
            paddingBottom: matchesXS ? '1em' : '3em',
            paddingLeft: matchesXS ? '1em' : '4em',
            paddingRight: matchesXS ? '1em' : '4em',
          },
        }}
      >
        {loading && <Loader />}
        {!canPlay && !loading && (
          <Grid item container direction='row' justify='center'>
            <Message severity='info' width>
              Έχεις ξεπεράσει τις φορές επανάληψης
            </Message>
          </Grid>
        )}
        {canPlay && (
          <>
            <DialogTitle disableTypography>
              <Typography gutterBottom variant={matchesXS ? 'h5' : 'h4'}>
                {'Κανόνες Παιχνιδιού'}{' '}
              </Typography>
            </DialogTitle>
            <Divider style={{ marginBottom: '0.8em' }} />
            <DialogContent id='game-rules-dialog-description'>
              <Grid container direction='column'>
                <Typography
                  gutterBottom
                  component='div'
                  variant='body2'
                  className={classes.textRules}
                >
                  1. You will have only <span>15 seconds</span> per each
                  question.
                </Typography>
                <Typography
                  component='div'
                  gutterBottom
                  variant='body2'
                  className={classes.textRules}
                >
                  2. Once you select your answer, it can't be undone.
                </Typography>
                <Typography
                  component='div'
                  variant='body2'
                  gutterBottom
                  className={classes.textRules}
                >
                  3. You can't select any option once time goes off.
                </Typography>
                <Typography
                  component='div'
                  gutterBottom
                  variant='body2'
                  className={classes.textRules}
                >
                  4. You can't exit from the Quiz while you're playing.
                </Typography>
              </Grid>
            </DialogContent>
          </>
        )}
        <DialogActions>
          <Grid
            item
            container
            alignItems='center'
            justify='space-around'
            direction='row'
            style={{
              marginTop: '2em',
            }}
          >
            <Grid item>
              <Button
                onClick={() => {
                  handleClose();
                  dispatch(checkCanPlayClean);
                }}
                className={classes.button}
              >
                Πίσω
              </Button>
            </Grid>
            {canPlay && (
              <Grid item>
                <Button
                  variant='contained'
                  className={classes.continuousButton}
                  onClick={() => {
                    dispatch(fetchingQuestions(id));
                    /*  dispatch(fetchingGame()); */
                  }}
                >
                  Συνέχεια
                </Button>
              </Grid>
            )}
          </Grid>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
