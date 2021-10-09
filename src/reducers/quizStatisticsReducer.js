import {
  STATISTICS_REQUEST,
  STATISTICS_SUCCESS,
  STATISTICS_FAIL,
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
