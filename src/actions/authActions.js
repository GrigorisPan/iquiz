import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_RESET,
} from '../constants/authConstants';
import {
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_RESET,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/v1/auth/login',
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const loginClean = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_UPDATE_PROFILE_RESET });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: LOGOUT });
};

export const register =
  (username, email, type, password) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/v1/auth/register',
        { username, email, type, password },
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.error,
      });
    }
  };

export const registerClean = () => (dispatch) => {
  dispatch({ type: REGISTER_RESET });
};
