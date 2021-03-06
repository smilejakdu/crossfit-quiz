import React, { useState } from 'react';
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
import Header from './Header';

const AppRouter = () => {
  const [userObj, setUserObj] = useState(
    () => JSON.parse(window.localStorage.getItem('userObj')) || null
  );
  const [cards, setCards] = useState([]);
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Header userObj={userObj} setUserObj={setUserObj} />
          <Home cards={cards} setCards={setCards} />
        </Route>
        <Route exact path="/settings">
          <Header userObj={userObj} setUserObj={setUserObj} />
          <Settings cards={cards} setCards={setCards} />
        </Route>
        <Route exact path="/quiz">
          <Header userObj={userObj} setUserObj={setUserObj} />
          <Quiz />
        </Route>
        <Route>
          <Header userObj={userObj} setUserObj={setUserObj} />
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
