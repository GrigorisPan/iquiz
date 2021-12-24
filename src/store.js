import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  quizDetailsReducer,
  quizListReducer,
  otpCheckReducer,
  quizCreateReducer,
  quizUpdateReducer,
  quizDeletedReducer,
  quizLibraryListReducer,
  quizLibraryDetailsReducer,
} from './reducers/quizReducers';
import {
  scoreTableReducer,
  quizStatisticsReducer,
  usersInClassReducer,
} from './reducers/quizStatisticsReducers';
import {
  digitalClassListReducer,
  digitalClassReducer,
  digitalClassCreateReducer,
} from './reducers/digitalClassReducers';
import { authLoginReducer, authRegisterReducer } from './reducers/authReducers';
import {
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';
import {
  addSuggestReducer,
  dClassAvalSuggestReducer,
  quizSuggestReducer,
} from './reducers/quizSuggestReducers';
const reducer = combineReducers({
  quizList: quizListReducer,
  quizLibraryList: quizLibraryListReducer,
  quizDetails: quizDetailsReducer,
  quizLibraryDetails: quizLibraryDetailsReducer,
  quizStatistics: quizStatisticsReducer,
  quizCreate: quizCreateReducer,
  quizUpdate: quizUpdateReducer,
  digitalClassList: digitalClassListReducer,
  digitalClass: digitalClassReducer,
  digitalClassCreate: digitalClassCreateReducer,
  quizSuggest: quizSuggestReducer,
  dClassAvalSuggest: dClassAvalSuggestReducer,
  addSuggest: addSuggestReducer,
  scoreTable: scoreTableReducer,
  authLogin: authLoginReducer,
  authRegister: authRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  usersInClass: usersInClassReducer,
  quizDeleted: quizDeletedReducer,
  otpCheck: otpCheckReducer,
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
