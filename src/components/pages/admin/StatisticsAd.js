import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {
  getStatisticsAll,
  deleteStatisticsClean,
  deleteStatistics,
} from '../../../actions/statisticsAction';
import TableShow from './components/TableShow';
import DeleteModal from '../teacher/components/DeleteModal';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';

const columns = [
  { id: 'user_id', label: 'User Id', minWidth: 20, align: 'center' },
  {
    id: 'quiz_id',
    label: 'Quiz Id',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'score_avg',
    label: 'Score Avg',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'correct_avg',
    label: 'Correct Avg',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'false_avg',
    label: 'False Avg',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'play_count',
    label: 'Play Count',
    minWidth: 20,
    align: 'center',
  },

  {
    id: 'createdAt',
    label: 'CreatedAt',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'updatedAt',
    label: 'UpdatedAt',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'more',
    label: '',
    minWidth: 20,
    align: 'center',
  },
];

function createData(
  id,
  user_id,
  quiz_id,
  score_avg,
  correct_avg,
  false_avg,
  play_count,
  createdAt,
  updatedAt,
  more
) {
  return {
    id,
    user_id,
    quiz_id,
    score_avg,
    correct_avg,
    false_avg,
    play_count,
    createdAt,
    updatedAt,
    more,
  };
}

const displayDate = (timestamp) => {
  const todate = new Date(timestamp).getDate();
  const tomonth = new Date(timestamp).getMonth() + 1;
  const toyear = new Date(timestamp).getFullYear();
  const original_date = tomonth + '/' + todate + '/' + toyear;
  return original_date;
};

export default function StatisticsAd() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const quizStatistics = useSelector((state) => state.quizStatistics);
  const { loading, statistics } = quizStatistics;

  const deletedStatistics = useSelector((state) => state.deletedStatistics);
  const { success: successDelete, error: errorDelete } = deletedStatistics;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login', { from: '/admin/suggestquizzies' });
    } else {
      dispatch(getStatisticsAll());
    }
  }, [dispatch, history, successDelete, errorDelete]);

  let rows = [];

  statistics.forEach((statistic) => {
    const createdAt = displayDate(statistic.createdAt);
    const updatedAt = displayDate(statistic.updatedAt);
    const id = `${statistic.user_id}-${statistic.quiz_id}`;
    let row = createData(
      id,
      statistic.user_id,
      statistic.quiz_id,
      statistic.score_avg,
      statistic.correct_avg,
      statistic.false_avg,
      statistic.play_count,
      createdAt,
      updatedAt,
      'more'
    );
    rows.push(row);
  });

  //Delete function
  const deleteHandler = (ids) => {
    dispatch(deleteStatistics(ids));
    setShow(true);
    setOpen(false);
    setTimeout(() => {
      setShow(false);
      dispatch(deleteStatisticsClean());
    }, 1500);
  };

  const handleClickOpen = (id) => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      setDeleteId(0);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Typography gutterBottom variant='h3'>
        Πίνακας Στατιστικών
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Grid container style={{ paddingBottom: '2em' }}>
          {show && successDelete && (
            <Grid container justify='center'>
              <Message severity='success'>Επιτυχής διαγραφή!</Message>
            </Grid>
          )}
          {show && errorDelete && (
            <Grid container justify='center'>
              <Message severity='error'>Σφάλμα</Message>
            </Grid>
          )}
        </Grid>
        {loading ? (
          <Loader />
        ) : (
          <>
            <DeleteModal
              open={open}
              setDeleteId={setDeleteId}
              setOpen={setOpen}
              deleteHandler={deleteHandler}
              deleteId={deleteId}
              handleClose={handleClose}
            />
            <TableShow
              columns={columns}
              rows={rows}
              rowsPerPage={rowsPerPage}
              page={page}
              setDeleteId={setDeleteId}
              handleClickOpen={handleClickOpen}
              editBtn={false}
              editUrl={'#'}
              deleteBtn={true}
            />
          </>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
