import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUp/index';
import Dashboard from '../pages/Dashboard/index';

import BarberRoute from './BarberRoute';

const Routes: React.FC = () => (
  <Switch>
    <BarberRoute path="/" exact component={SignIn} />
    <BarberRoute path="/signup" component={SignUp} />
    <BarberRoute path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
