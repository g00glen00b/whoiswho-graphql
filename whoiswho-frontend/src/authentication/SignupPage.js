import gql from 'graphql-tag';
import {CenteredBox} from '../shared/layout/CenteredBox';
import {Card} from '../shared/Card';
import React from 'react';
import {SignupForm} from './SignupForm';
import {useMutation} from '@apollo/react-hooks';
import {ErrorMessages} from '../shared/text/ErrorMessages';
import {SuccessMessage} from '../shared/text/SuccessMessage';
import {LinkButton} from '../shared/form/Button';

const signupMutation = gql`
  mutation ($userInfo: CreateUserInput!, $personInfo: CreatePersonInput!) {
    createUser(userInfo: $userInfo, personInfo: $personInfo) {
      person {
        id
        firstName
      }
    }
  }
`;

export const SignupPage = () => {
  const [signup, {data, error}] = useMutation(signupMutation);
  const isCreated = data && data.createUser && data.createUser.person;
  return (
    <CenteredBox>
      <h1>Sign up</h1>
      <Card flex>
        {error && <ErrorMessages errors={error.graphQLErrors} maxWidth="600px"/>}
        {isCreated && <SuccessMessage message="You are now part of the cool club and able to log in.">
          <LinkButton primary to="/login">Log in</LinkButton>
        </SuccessMessage>}
        {!isCreated && <SignupForm onSignup={({userInfo, personInfo}) => signup({variables: {userInfo, personInfo}})}/>}
      </Card>
    </CenteredBox>
  );
};
