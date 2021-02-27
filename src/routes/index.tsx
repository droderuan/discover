import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '../pages/Home';
import Result from '../pages/Result';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search" component={Result} />
      <Route path="/profile" component={Profile} needAuthentication />
      <Route path="/accounts/login" component={Login} authRoute />
      <Route path="/accounts/signup" component={Signup} authRoute />
    </Switch>
  );
};

export default Routes;
