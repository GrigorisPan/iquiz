import {
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_FAIL,
} from '../constants/quizConstants';

export const quizListReducer = (state = { quizzes: [] }, action) => {
  switch (action.type) {
    case QUIZ_LIST_REQUEST:
      return { loading: true, quizzes: [] };
    case QUIZ_LIST_SUCCESS:
      return { loading: false, quizzes: action.payload };
    case QUIZ_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
