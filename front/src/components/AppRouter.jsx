import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import GlobalStyle from '../globalStyles';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Quiz from '../pages/Quiz';
import Settings from '../pages/Settings';

const AppRouter = () => {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/settings">
          <Settings />
        </Route>
        <Route exact path="/quiz">
          <Quiz />
        </Route>
        <Route>
          <NotFound />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
