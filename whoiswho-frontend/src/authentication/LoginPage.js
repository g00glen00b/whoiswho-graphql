import React from 'react';
import {CenteredBox} from '../shared/layout/CenteredBox';
import {Card} from '../shared/Card';
import {LoginForm} from './LoginForm';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {authenticationQuery} from './queries';
import {authenticationId} from '../ApiClient';
import {ErrorMessages} from '../shared/text/ErrorMessages';

const loginMutation = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      person {
        id
        firstName
        avatar
        roles
      }
    }
  }
`;

export const LoginPage = () => {
  const updateCache = (cache, {data: {login: {token, person: {id, firstName, avatar, roles}}}}) => {
    const authentication = {
      id: authenticationId,
      firstName,
      avatar,
      isAuthenticated: true,
      isAdmin: roles.includes('ADMIN'),
      personId: id,
      token,
      __typename: 'Authentication'
    };
    cache.writeQuery({query: authenticationQuery, data: {authentication}});
  };

  const [login, {error}] = useMutation(loginMutation, {update: updateCache});
  return (
    <CenteredBox>
      <h1>Log in</h1>
      <Card flex>
        {error && <ErrorMessages errors={error.graphQLErrors} maxWidth="300px"/>}
        <LoginForm onLogin={variables => login({variables})}/>
      </Card>
    </CenteredBox>
  );
};
