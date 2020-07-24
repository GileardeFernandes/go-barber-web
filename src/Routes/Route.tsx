import React, { ComponentType } from 'react';
import {
  Route as RouteDomReact,
  RouteProps as RoteDOMProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../Hooks/auth';

interface RouteProps extends RoteDOMProps {
  isPrivate?: boolean;
  component: ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <RouteDomReact
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
