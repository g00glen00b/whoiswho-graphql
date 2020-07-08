import {useQuery} from '@apollo/react-hooks';
import {Redirect, Route} from 'react-router';
import React from 'react';
import {authenticationQuery} from './queries';

export const AuthenticatedRoute = ({component: Component, ...rest}) => {
  const {data, loading} = useQuery(authenticationQuery, {fetchPolicy: 'cache-first'});
  if (loading) return null;
  return (
    <Route {...rest} render={props => data && data.authentication && data.authentication.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )} />
  );
};

export const AnonymousRoute = ({component: Component, ...rest}) => {
  const {data, loading} = useQuery(authenticationQuery, {fetchPolicy: 'cache-first'});
  if (loading) return null;
  return (
    <Route {...rest} render={props => data && data.authentication && !data.authentication.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{pathname: '/people', state: {from: props.location}}}/>
    )} />
  );
};
