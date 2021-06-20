import React from 'react';
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
import CreateQuiz from './pages/teacher/CreateQuiz';
import DigitalClass from './pages/teacher/DigitalClass';
import InfoClass from './pages/teacher/InfoClass';
import Statistics from './pages/teacher/Statistics';
const login = false;
const role = 'teacher';
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
        </Switch>
        <Footer />
      </React.Fragment>
    );
  } else if (role === 'teacher') {
    return (
      <React.Fragment>
        <Layout role={role}>
          <Switch>
            <Route exact path='/teacher'>
              <Home />
            </Route>
            <Route exact path='/teacher/quiz/:id'>
              <InfoQuiz />
            </Route>
            <Route exact path='/teacher/create-quiz'>
              <CreateQuiz />
            </Route>
            <Route
              exact
              path='/teacher/library'
              component={() => <div>Create library</div>}
            />

            <Route exact path='/teacher/digiClass'>
              <DigitalClass />
            </Route>
            <Route exact path='/teacher/digiClass/:id'>
              <InfoClass />
            </Route>
            <Route exact path='/teacher/statistics'>
              <Statistics />
            </Route>
          </Switch>
        </Layout>
      </React.Fragment>
    );
  } else if (role === 'student') {
    return (
      <React.Fragment>
        <Layout role={role}>
          <Switch>
            <Route
              exact
              path='/student'
              component={() => <div> Student Info Quiz</div>}
            />
            <Route
              exact
              path='/student/digiClass'
              component={() => <div>student Digiral Class</div>}
            />

            <Route
              exact
              path='/student/statistics'
              component={() => <div> student Statistics</div>}
            />
          </Switch>
        </Layout>
      </React.Fragment>
    );
  } else {
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>{route()}</BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
