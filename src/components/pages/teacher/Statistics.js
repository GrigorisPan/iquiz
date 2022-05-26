import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { getStatistics } from '../../../actions/statisticsAction';
import StatisticsCard from './components/StatisticsCard';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';
import {
  reportDelete,
  reportDeleteClean,
} from '../../../actions/reportActions';

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
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const quizStatistics = useSelector((state) => state.quizStatistics);
  const { loading, error, statistics } = quizStatistics;

  const reportDeleted = useSelector((state) => state.reportDeleted);
  const { success: successDelete } = reportDeleted;

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  //Delete function
  const deleteHandler = (id) => {
    dispatch(reportDelete(id));
    setShow(true);
    setTimeout(() => {
      dispatch(getStatistics());
      setShow(false);
      dispatch(reportDeleteClean());
    }, 1000);
  };

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
      {successDelete && show && (
        <Grid container justify='center' style={{ marginBottom: '0.5em' }}>
          <Message severity='success'>Επιτυχής διαγραφή!</Message>
        </Grid>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Grid container justify='center'>
          <Message severity='info'>{error}</Message>
        </Grid>
      ) : (
        statistics.map((statistic) => (
          <StatisticsCard
            key={statistic.id}
            statistic={statistic}
            deleteHandler={deleteHandler}
          />
        ))
      )}
    </Grid>
  );
}
