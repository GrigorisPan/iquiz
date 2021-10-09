import {
  DIGITALCLASS_LIST_REQUEST,
  DIGITALCLASS_LIST_SUCCESS,
  DIGITALCLASS_LIST_FAIL,
} from '../constants/digitalClassConstants';
import axios from 'axios';

export const listDigitalClass = (id) => async (dispatch) => {
  try {
    dispatch({ type: DIGITALCLASS_LIST_REQUEST });

    const res = await axios.get(`/api/v1/digitalclass/${id}`);

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
