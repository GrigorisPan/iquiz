import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Grid, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { io } from 'socket.io-client';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';

import GameOptions from './components/GameOptions';
import {
  exitGame,
  playerAnswer,
  playerJoinGame,
  playerJoinReset,
} from '../../../actions/liveGameClientActions';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '88vh',
    alignItems: 'center',
  },
  endButton: {
    ...theme.typography.mainButton,
    backgroundColor: '#ff4e4e',
    color: '#ffff',
    margin: '1em 1em',
    padding: '0.8em 1.5em',
    '&:hover': {
      backgroundColor: '#f85555',
    },
  },
}));

let socket;
export default function ClientGame() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const liveGameClient = useSelector((state) => state.liveGameClient);
  const {
    loading,
    error,
    playerAnswered,
    correct,
    feedback,
    timeUp,
    playerDisable,
  } = liveGameClient;

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push('/livegame/landing', { from: 'ClientGame' });
        dispatch(playerJoinReset(socket));
      }, 2000);
    }
  }, [dispatch, history, error]);

  useEffect(() => {
    socket = io('/', {
      reconnection: false,
    });
    if (socket) {
      dispatch(playerJoinGame(socket));
    }
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const answerSubmitted = (choice) => {
    dispatch(playerAnswer(socket, choice));
  };

  const exitGameHandler = () => {
    dispatch(exitGame(socket));
  };

  return (
    <Grid
      container
      direction='column'
      className={classes.mainContainer}
      spacing={3}
      justify='center'
    >
      {loading ? (
        <Loader />
      ) : error ? (
        <Grid container justify='center' alignItems='flex-start'>
          <Message severity='error'>{error}</Message>
        </Grid>
      ) : (
        <>
          <Grid item container justify='center'>
            {!playerAnswered && !timeUp && !playerDisable && (
              <GameOptions answerSubmitted={answerSubmitted} />
            )}
            {playerAnswered && !playerDisable && (
              <Grid item container direction='column' alignItems='center'>
                <Grid item>
                  <Typography
                    variant='h3'
                    style={{ color: '#fff', textAlign: 'center' }}
                  >
                    ?????????????????????? ?? ????????????????. ?????????????? ?????? ?????? ?????????????? ??????????????.
                  </Typography>
                </Grid>

                {!feedback ? (
                  <Loader />
                ) : (
                  <Grid item container justify='center' sm={6}>
                    <Message severity={correct ? 'success' : 'error'}>
                      {correct ? '?????????? ????????????????' : '?????????? ????????????????'}
                    </Message>
                  </Grid>
                )}
              </Grid>
            )}
            {timeUp && !playerDisable && (
              <Grid item container direction='column' alignItems='center'>
                <Grid item>
                  <Typography
                    variant='h3'
                    style={{ color: '#fff', textAlign: 'center' }}
                  >
                    '?????????? ?? ????????????
                  </Typography>
                </Grid>
              </Grid>
            )}
            {playerDisable && (
              <Grid item container direction='column' alignItems='center'>
                <Grid item>
                  <Typography
                    variant='h3'
                    style={{ color: '#fff', textAlign: 'center' }}
                  >
                    '?????????? ?????????????????? ???? ???????????????????????? ????????
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Grid item container justify='center'>
              <Button
                variant='contained'
                className={classes.endButton}
                onClick={() => exitGameHandler()}
              >
                ????????????
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
