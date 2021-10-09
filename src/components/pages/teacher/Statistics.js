import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { teacherStatistics } from '../../../actions/statisticsAction';

import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';

import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import StatisticsCard from './components/StatisticsCard';
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '100vh',
  },
  specialText: {
    color: theme.palette.common.orange,
  },
}));

export default function Statistics() {
  const classes = useStyles();
  const theme = useTheme();
  const [reports, setReports] = useState(false);
  const dispatch = useDispatch();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const reportsHandler = () => {
    setReports((prevState) => !prevState);
  };

  const quizStatistics = useSelector((state) => state.quizStatistics);
  const { loading, error, statistics } = quizStatistics;

  useEffect(() => {
    dispatch(teacherStatistics(1));
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
          <StatisticsCard key={statistic.id} statistic={statistic} />
        ))
      )}
    </Grid>
  );
}
