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

const AppRouter = () => {
  const [userObj, setUserObj] = useState(
    () => JSON.parse(window.localStorage.getItem('userObj')) || null
  );
<<<<<<< HEAD
  const [cards, setCards] = useState([]);
=======
>>>>>>> 6f82ad49c15c779fdff7d2b0f70c339742a377b5

  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Home
            cards={cards}
            setCards={setCards}
            userObj={userObj}
            setUserObj={setUserObj}
          />
        </Route>
        <Route exact path="/settings">
          <Settings
            cards={cards}
            setCards={setCards}
            userObj={userObj}
            setUserObj={setUserObj}
          />
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
