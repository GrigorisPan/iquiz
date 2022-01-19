import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import theme from './ui/Theme';
import Header from './ui/Header';
import Footer from './ui/Footer';
import LandingPage from './pages/public/LandingPage';
import Signup from './pages/public/Signup';
import Login from './pages/public/Login';
import Layout from './ui/Layout';
import Home from './pages/teacher/Home';
import InfoQuiz from './pages/teacher/InfoQuiz';
import QuizCreate from './pages/teacher/QuizCreate';
import Library from './pages/teacher/Library';
import DigitalClass from './pages/teacher/DigitalClass';
import InfoClass from './pages/teacher/InfoClass';
import Statistics from './pages/teacher/Statistics';
import { Redirect } from 'react-router';
import Profile from './pages/teacher/Profile';
import EditQuiz from './pages/teacher/EditQuiz';

import HomeSt from './pages/student/HomeSt';
import InfoQuizSt from './pages/student/InfoQuizSt';
import DigitalClassSt from './pages/student/DigitalClassSt';
import InfoClassSt from './pages/student/InfoClassSt';
import ProfileSt from './pages/student/ProfileSt';
import StatisticsSt from './pages/student/StatisticsSt';

import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import UserEdit from './pages/admin/UserEdit';
import ProfileAd from './pages/admin/ProfileAd';
import DigitalClasses from './pages/admin/DigitalClasses';
import DigitalClassEdit from './pages/admin/DigitalClassEdit';
import Quizzes from './pages/admin/Quizzes';
import QuizEdit from './pages/admin/QuizEdit';
import Reports from './pages/admin/Reports';
import SuggestQuizzes from './pages/admin/SuggestQuizzes';
import StatisticsAd from './pages/admin/StatisticsAd';
let login = false;
let type = undefined;

function App() {
  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;
  if (userInfo) {
    login = true;
    type = +userInfo.type;
  } else {
    login = false;
  }

  const route = () => {
    if (!login) {
      return (
        <React.Fragment>
          <Header />

          <Switch>
            <Route exact path='/'>
              <LandingPage />
            </Route>
            <Route path='/signup'>
              <Signup />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/contact' component={() => <div>Contact</div>} />
            <Redirect to='/' />
          </Switch>
          <Footer />
        </React.Fragment>
      );
    } else if (type === 2) {
      return (
        <React.Fragment>
          <Layout role={'teacher'}>
            <Switch>
              <Route path='/teacher/search/:searched'>
                <Home />
              </Route>
              <Route exact path='/teacher'>
                <Home />
              </Route>
              <Route exact path='/teacher/quiz/:id'>
                <InfoQuiz match={URL.match} />
              </Route>
              <Route exact path='/teacher/create-quiz'>
                <QuizCreate />
              </Route>
              <Route exact path='/teacher/library/'>
                <Library />
              </Route>
              <Route exact path='/teacher/library/edit/:id'>
                <EditQuiz match={URL.match} />
              </Route>
              <Route exact path='/teacher/digiClass'>
                <DigitalClass />
              </Route>
              <Route exact path='/teacher/digiClass/:id'>
                <InfoClass />
              </Route>
              <Route exact path='/teacher/statistics'>
                <Statistics />
              </Route>
              <Route exact path='/profile'>
                <Profile />
              </Route>
              <Redirect to='/teacher' />
            </Switch>
          </Layout>
        </React.Fragment>
      );
    } else if (type === 0) {
      return (
        <React.Fragment>
          <Layout role={'student'}>
            <Switch>
              <Route exact path='/student'>
                <HomeSt />
              </Route>
              <Route exact path='/student/quiz/:id'>
                <InfoQuizSt match={URL.match} />
              </Route>
              <Route exact path='/student/statistics'>
                <StatisticsSt />
              </Route>
              <Route exact path='/student/digiClass'>
                <DigitalClassSt />
              </Route>
              <Route exact path='/student/digiClass/:id'>
                <InfoClassSt />
              </Route>
              <Route exact path='/profile'>
                <ProfileSt />
              </Route>
              <Redirect to='/student' />
            </Switch>
          </Layout>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Layout role={'admin'}>
            <Switch>
              <Route exact path='/admin'>
                <Dashboard />
              </Route>
              <Route exact path='/admin/users'>
                <Users />
              </Route>
              <Route exact path='/admin/users/edit/:id'>
                <UserEdit />
              </Route>
              <Route exact path='/admin/quizzes'>
                <Quizzes />
              </Route>
              <Route exact path='/admin/quizzes/edit/:id'>
                <QuizEdit />
              </Route>
              <Route exact path='/admin/digitalclass'>
                <DigitalClasses />
              </Route>
              <Route exact path='/admin/digitalclass/edit/:id'>
                <DigitalClassEdit />
              </Route>
              <Route exact path='/admin/reports/'>
                <Reports />
              </Route>
              <Route exact path='/admin/suggestquizzes/'>
                <SuggestQuizzes />
              </Route>
              <Route exact path='/admin/statistics/'>
                <StatisticsAd />
              </Route>
              <Route exact path='/profile'>
                <ProfileAd />
              </Route>
              <Redirect to='/admin' />
            </Switch>
          </Layout>
        </React.Fragment>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>{route()}</BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
