import {
  REPORT_LIST_FAIL,
  REPORT_LIST_REQUEST,
  REPORT_LIST_SUCCESS,
  REPORT_DELETE_FAIL,
  REPORT_DELETE_REQUEST,
  REPORT_DELETE_SUCCESS,
  REPORT_DETELE_RESET,
} from '../constants/reportConstants';
import axios from 'axios';

export const getReportsAll = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REPORT_LIST_REQUEST });
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(`/api/v1/reports/all`, config);

    const data = res.data.data;

    dispatch({
      type: REPORT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_LIST_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const reportDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REPORT_DELETE_REQUEST });
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //console.log(config);
    const res = await axios.delete(`/api/v1/reports/${id}`, config);

    const data = res.data.data;

    dispatch({
      type: REPORT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_DELETE_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const reportDeleteClean = () => async (dispatch) => {
  dispatch({ type: REPORT_DETELE_RESET });
};
