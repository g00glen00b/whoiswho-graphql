import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {CenteredBox} from '../shared/layout/CenteredBox';
import {Card} from '../shared/Card';
import {ErrorMessages} from '../shared/text/ErrorMessages';
import {SuccessMessage} from '../shared/text/SuccessMessage';
import {LinkButton} from '../shared/form/Button';
import React from 'react';
import {EditPasswordForm} from './EditPasswordForm';
import {useAuthentication} from './useAuthentication';

const updatePasswordMutation = gql`
  mutation ($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      person {
        id
      }
    }
  }
`;

export const EditPasswordPage = () => {
  const {personId} = useAuthentication();
  const [update, {data: updateData, error}] = useMutation(updatePasswordMutation);
  const isUpdated = updateData != null && updateData.updatePassword != null;

  return (
    <CenteredBox>
      <h1>Edit password</h1>
      <Card flex>
        {error && <ErrorMessages errors={error.graphQLErrors} maxWidth="600px"/>}
        {isUpdated && <SuccessMessage message="Your password is updated">
          <LinkButton primary to={`/people/${personId}`}>Back to profile</LinkButton>
        </SuccessMessage>}
        {!isUpdated && <EditPasswordForm
          id={personId}
          onEdit={input => update({variables: {input}})}/>}
      </Card>
    </CenteredBox>
  );
}
