/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Route,
  RouteProps as ReactDOMRouteProps,// para poder passar as propriedades
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType; // para poder passar um component
}

/* RULE FOR ACCESSING PAGES
true/true OK
true/false =  redirect the user to login page
false/true = redirect user to dasboard page
false/false = OK
*/

const BarberRoute: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  console.log('isp ', isPrivate, user)
  return (
    <Route
      {...rest}
      render={routeProps => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
            <Redirect
              to={{
                pathname: isPrivate ? '/' : '/dashboard',
                state: { from: routeProps.location },// para manter o histo'rico de rotas
              }}
            />
          );
      }}
    />
  );
};

export default BarberRoute;

/*
 return <Route {...rest} render={props => {
    return isPrivate === !!user ? (<Component />) : (<Redirect to={{
      pathname: isPrivate ? '/' : '/dashboard', state: { from: props.location }
    }})
  } />;
*/
