import {
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_FAIL,
  QUIZ_DETAILS_REQUEST,
  QUIZ_DETAILS_SUCCESS,
  QUIZ_DETAILS_FAIL,
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

export const quizDetailsReducer = (
  state = { quiz: { users_p: {} } },
  action
) => {
  switch (action.type) {
    case QUIZ_DETAILS_REQUEST:
      return { loading: true, ...state };
    case QUIZ_DETAILS_SUCCESS:
      return { loading: false, quiz: action.payload };
    case QUIZ_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
