import {
  STATISTICS_REQUEST,
  STATISTICS_SUCCESS,
  STATISTICS_FAIL,
  SCORE_REQUEST,
  SCORE_SUCCESS,
  SCORE_FAIL,
  USERS_INCLASS_SUCCESS,
  USERS_INCLASS_REQUEST,
  USERS_INCLASS_FAIL,
} from '../constants/statisticsConstants';
import axios from 'axios';

export const teacherStatistics = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STATISTICS_REQUEST });
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(`/api/v1/statistics/${id}`, config);

    const data = res.data.data;

    dispatch({
      type: STATISTICS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STATISTICS_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const getScore = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SCORE_REQUEST });

    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`/api/v1/statistics/score/${id}`, config);

    const data = res.data.data;

    dispatch({
      type: SCORE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCORE_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const getUsersInClass = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USERS_INCLASS_REQUEST });
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(`/api/v1/statistics/users/${id}`, config);

    const data = res.data;

    dispatch({
      type: USERS_INCLASS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USERS_INCLASS_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};
