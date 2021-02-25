import React, { useMemo } from 'react';
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../hooks/Store';

interface IRouteProps extends ReactDOMRouteProps {
  needAuthentication?: boolean;
  authRoute?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<IRouteProps> = ({
  needAuthentication = false,
  authRoute = false,
  component: Component,
  ...props
}) => {
  const { authStore } = useStore();

  const { authenticated } = authStore;

  const redirect = useMemo(() => {
    if (needAuthentication) {
      return !authenticated;
    }
    return false;
  }, [needAuthentication, authenticated]);

  return (
    <ReactDOMRoute
      {...props}
      render={({ location }) => {
        if (authRoute) {
          return !authenticated ? (
            <Component />
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          );
        }
        return redirect ? (
          <Redirect
            to={{
              pathname: '/accounts/login',
              state: { from: location },
            }}
          />
        ) : (
          <Component />
        );
      }}
    />
  );
};

export default observer(Route);
