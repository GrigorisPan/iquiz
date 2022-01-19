import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import TableShow from './components/TableShow';
import {
  getUsersList,
  userDelete,
  userDetailsClean,
  deleteUserClean,
} from '../../../actions/userActions';
import { getAllUsersInClass } from '../../../actions/statisticsAction';
import DeleteModal from '../teacher/components/DeleteModal';
import UserInClass from './UsersInClass';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';

const useStyles = makeStyles((theme) => ({
  containerButtons: {
    display: 'flex',
    justifyContent: ' space-around',
    flexWrap: 'nowrap',
  },
  editButton: {
    backgroundColor: '#4caf50',
    marginRight: '0.2em',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#6fbf73',
    },
  },
  deleteButton: {
    ...theme.typography.mainButton,
    backgroundColor: '#ff1744',
    marginLeft: '0.2em',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#ff4569',
    },
  },
  moreButton: {
    ...theme.typography.mainButton,
    borderRadius: '50px',
    width: '250px',
    height: '50px',
    alignItems: 'center',
    backgroundColor: theme.palette.common.blue,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  mainText: {
    textAlign: 'center',
    padding: '0.5em 3.5em',
    [theme.breakpoints.down('md')]: {
      padding: '0.5em 1.5em',
    },
  },
}));

const columns = [
  { id: 'id', label: 'Id', minWidth: 20 },
  { id: 'username', label: 'Username', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'type',
    label: 'Type',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'createdAt',
    label: 'CreatedAt',
    minWidth: 20,
    align: 'right',
  },
  {
    id: 'updatedAt',
    label: 'UpdatedAt',
    minWidth: 20,
    align: 'right',
  },
  {
    id: 'more',
    label: '',
    minWidth: 20,
    align: 'center',
  },
];

function createData(id, username, email, type, createdAt, updatedAt, more) {
  return { id, username, email, type, createdAt, updatedAt, more };
}
const displayDate = (timestamp) => {
  const todate = new Date(timestamp).getDate();
  const tomonth = new Date(timestamp).getMonth() + 1;
  const toyear = new Date(timestamp).getFullYear();
  const original_date = tomonth + '/' + todate + '/' + toyear;
  return original_date;
};

export default function Users() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [show, setShow] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;

  const userDeleted = useSelector((state) => state.userDeleted);
  const { success: successDelete, error: errorDelete } = userDeleted;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login', { from: '/admin/users' });
    } else {
      /* dispatch(userDetailsClean()); */
      dispatch(getUsersList());
    }
  }, [dispatch, history, successDelete, errorDelete]);

  let rows = [];

  users.forEach((user) => {
    if (userInfo.id !== user.id) {
      const createdAt = displayDate(user.createdAt);
      const updatedAt = displayDate(user.updatedAt);
      let row = createData(
        user.id,
        user.username,
        user.email,
        user.type,
        createdAt,
        updatedAt,
        'more'
      );
      rows.push(row);
    }
  });

  //Delete function
  const deleteHandler = (id) => {
    dispatch(userDelete(id));
    setShow(true);
    setOpen(false);
    setTimeout(() => {
      setShow(false);
      dispatch(deleteUserClean());
    }, 1200);
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
        Πίνακας Χρηστών
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
              editUrl={`/admin/users/edit`}
              editBtn={true}
              deleteBtn={true}
            />
            {/*  <TableContainer sx={{ maxHeight: 440 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value === 'more' ? (
                                  <div className={classes.containerButtons}>
                                    <Button
                                      className={classes.editButton}
                                      component={Link}
                                      to={`/admin/users/edit/${row.id}`}
                                    >
                                      <Icon>
                                        <span className='material-icons'>
                                          edit
                                        </span>
                                      </Icon>
                                    </Button>
                                    <Button
                                      className={classes.deleteButton}
                                      id={row.id}
                                      onClick={() => {
                                        setDeleteId(row.id);
                                        handleClickOpen();
                                        console.log(row.id);
                                      }}
                                    >
                                      <Icon>
                                        <span className='material-icons'>
                                          delete
                                        </span>
                                      </Icon>
                                    </Button>
                                  </div>
                                ) : column.format &&
                                  typeof value === 'number' ? (
                                  column.format(value)
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer> */}
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
      <Grid
        container
        direction='column'
        justifycontent='center'
        alignItems='center'
        style={{ margin: '2em 0em' }}
      >
        <Typography
          variant={matchesXS ? 'subtitle2' : 'subtitle1'}
          align='center'
          className={classes.mainText}
        >
          Δες τους χρήστες που είναι εγγεγραμένοι σε ψηφιακές τάξεις
        </Typography>
        <Grid item align='center' style={{ marginTop: '0.8em' }}>
          <Button
            className={classes.moreButton}
            variant='contained'
            onClick={() => {
              setShowMore(true);
              dispatch(getAllUsersInClass());
            }}
          >
            Εμφάνιση πίνακα
          </Button>
        </Grid>
      </Grid>
      {showMore && <UserInClass />}
    </>
  );
}
