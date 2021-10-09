import {
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_FAIL,
  QUIZ_DETAILS_REQUEST,
  QUIZ_DETAILS_SUCCESS,
  QUIZ_DETAILS_FAIL,
} from '../constants/quizConstants';
import axios from 'axios';

export const listQuizzes = () => async (dispatch) => {
  try {
    dispatch({ type: QUIZ_LIST_REQUEST });

    const res = await axios.get('/api/v1/quizzes/');

    const data = res.data.data;
    dispatch({
      type: QUIZ_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUIZ_LIST_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const listQuizDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: QUIZ_DETAILS_REQUEST });

    const res = await axios.get(`/api/v1/quizzes/${id}`);

    const data = res.data.data;
    dispatch({
      type: QUIZ_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUIZ_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};
