import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import {
  getUserDetails,
  updateUserClean,
  updateUserProfile,
  userDetailsClean,
} from '../../../actions/userActions';
import Message from '../../ui/Message';
import MainForm from '../teacher/components/MainForm';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '88vh',
  },
}));

export default function UserEdit() {
  const classes = useStyles();
  let history = useHistory();
  const isMountedRef = useRef('false');
  let { id } = useParams();

  const [type, setType] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState('null');

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const success = userUpdateProfile.success;
  const err = userUpdateProfile.error;

  const dispatch = useDispatch();

  useEffect(() => {
    isMountedRef.current = true;

    if (!userInfo) {
      history.push('/login', { from: '/admin/users/edit/:id' });
    } else {
      if (!user.id || user.id !== +id) {
        dispatch(getUserDetails(id));
        //console.log(user);
      } else {
        setUsername(user.username);
        setEmail(user.email);
        setType(user.type);
      }
    }

    return () => {
      setTimeout(() => {
        isMountedRef.current = false;
        if (!isMountedRef.current) {
          dispatch(updateUserClean());
        }
      }, 1500);
    };
  }, [dispatch, history, id, userInfo, user, isMountedRef]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Λάθος κωδικοί.');
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setMessage('');
        isMountedRef.current = true;
      }, 1300);
    } else {
      dispatch(updateUserProfile(user.id, { username, email, type, password }));
      setShow(true);
      setTimeout(() => {
        setShow(false);
        isMountedRef.current = true;
      }, 1500);
    }

    dispatch(userDetailsClean());
  };
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      className={classes.container}
    >
      {show && message && (
        <Grid item container justify='center' style={{ marginBottom: '1em' }}>
          <Message severity='info'>{message}</Message>
        </Grid>
      )}
      {show && error && (
        <Grid item container justify='center' style={{ marginBottom: '1em' }}>
          <Message severity='error'>{error}</Message>
        </Grid>
      )}
      {show && err && (
        <Grid item container justify='center' style={{ marginBottom: '1em' }}>
          <Message severity='error'>{err}</Message>
        </Grid>
      )}
      {show && success && (
        <Grid item container justify='center' style={{ marginBottom: '1em' }}>
          <Message severity='success'>Επιτυχή ενημέρωση</Message>
        </Grid>
      )}

      <MainForm
        loading={loading}
        text={'Επεξεργασία χρήστη'}
        title={`ID: ${id}`}
        submitHandler={submitHandler}
        selection={true}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        username={username}
        email={email}
        type={type}
        setType={setType}
        isAdmin={true}
      />
    </Grid>
  );
}
