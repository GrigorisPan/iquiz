import {
  STATISTICS_REQUEST,
  STATISTICS_SUCCESS,
  STATISTICS_FAIL,
  SCORE_REQUEST,
  SCORE_SUCCESS,
  SCORE_FAIL,
  USERS_INCLASS_REQUEST,
  USERS_INCLASS_SUCCESS,
  USERS_INCLASS_FAIL,
} from '../constants/statisticsConstants';

export const quizStatisticsReducer = (state = { statistics: [] }, action) => {
  switch (action.type) {
    case STATISTICS_REQUEST:
      return { loading: true, statistics: [] };
    case STATISTICS_SUCCESS:
      return { loading: false, statistics: action.payload };
    case STATISTICS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const scoreTableReducer = (state = { score: [] }, action) => {
  switch (action.type) {
    case SCORE_REQUEST:
      return { loading: true, score: [] };
    case SCORE_SUCCESS:
      return { loading: false, score: action.payload };
    case SCORE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const usersInClassReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USERS_INCLASS_REQUEST:
      return { loading: true, users: [] };
    case USERS_INCLASS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case USERS_INCLASS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
