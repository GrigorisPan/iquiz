import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { getStatistics } from '../../../actions/statisticsAction';
import StatisticsCardSt from './components/StatisticsCardSt';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '100vh',
  },
  specialText: {
    color: theme.palette.common.orange,
  },
}));

export default function StatisticsSt() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const quizStatistics = useSelector((state) => state.quizStatistics);
  const authLogin = useSelector((state) => state.authLogin);

  const { loading, error, statistics } = quizStatistics;
  const { userInfo } = authLogin;

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      className={classes.mainContainer}
    >
      <Grid item>
        <Typography
          gutterBottom
          variant={matchesXS ? 'h4' : 'h3'}
          align='center'
          style={{
            marginBottom: '1em',
          }}
        >
          Στατιστικά Δεδομένα των{' '}
          <span className={classes.specialText}>Κουίζ</span>
        </Typography>
      </Grid>
      {loading ? (
        <Loader />
      ) : error ? (
        <Grid container justify='center'>
          <Message severity='error'>{error}</Message>
        </Grid>
      ) : !statistics ? (
        <Grid container justify='center'>
          <Message severity='info'>Δεν υπάρχουν στατιστικά</Message>
        </Grid>
      ) : (
        statistics.map((statistic) => (
          <StatisticsCardSt key={statistic.id} statistic={statistic} />
        ))
      )}
    </Grid>
  );
}
