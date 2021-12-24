import {
  DIGITALCLASS_LIST_REQUEST,
  DIGITALCLASS_LIST_SUCCESS,
  DIGITALCLASS_LIST_FAIL,
  DIGITALCLASS_REQUEST,
  DIGITALCLASS_SUCCESS,
  DIGITALCLASS_FAIL,
  DIGITALCLASS_RESET,
  DIGITALCLASS_CREATE_SUCCESS,
  DIGITALCLASS_CREATE_FAIL,
  DIGITALCLASS_CREATE_REQUEST,
  DIGITALCLASS_CREATE_RESET,
} from '../constants/digitalClassConstants';
import axios from 'axios';

export const getDigitalClassList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DIGITALCLASS_LIST_REQUEST });
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`/api/v1/digitalclass/user`, config);

    const data = res.data.data;
    dispatch({
      type: DIGITALCLASS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIGITALCLASS_LIST_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const getDigitalClass = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIGITALCLASS_REQUEST });

    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`/api/v1/digitalclass/${id}`, config);

    const data = res.data.data[0];
    dispatch({
      type: DIGITALCLASS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIGITALCLASS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const digitalClassClean = () => (dispatch) => {
  dispatch({ type: DIGITALCLASS_RESET });
};

export const digitalClassNew = (body) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIGITALCLASS_CREATE_REQUEST });

    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log(body, config);
    const res = await axios.put('/api/v1/digitalclass/create/', body, config);

    const data = res.data.data;
    dispatch({
      type: DIGITALCLASS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIGITALCLASS_CREATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const digitalClassCreateClean = () => (dispatch) => {
  dispatch({ type: DIGITALCLASS_CREATE_RESET });
};
