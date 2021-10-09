import {
  STATISTICS_REQUEST,
  STATISTICS_SUCCESS,
  STATISTICS_FAIL,
} from '../constants/statisticsConstants';
import axios from 'axios';

export const teacherStatistics = (id) => async (dispatch) => {
  try {
    dispatch({ type: STATISTICS_REQUEST });

    const res = await axios.get(`/api/v1/statistics/${id}`);

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
