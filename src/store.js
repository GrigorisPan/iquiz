import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { quizDetailsReducer, quizListReducer } from './reducers/quizReducers';
import { quizStatisticsReducer } from './reducers/quizStatisticsReducer';
import { digitalClassReducer } from './reducers/digitalClassReducer';
import { authLoginReducer } from './reducers/authReducers';
const reducer = combineReducers({
  quizList: quizListReducer,
  quizDetails: quizDetailsReducer,
  quizStatistics: quizStatisticsReducer,
  digitalClass: digitalClassReducer,
  authLogin: authLoginReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  authLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
