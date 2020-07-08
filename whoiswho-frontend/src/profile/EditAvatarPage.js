import gql from 'graphql-tag';
import {Card} from '../shared/Card';
import {ErrorMessages} from '../shared/text/ErrorMessages';
import {SuccessMessage} from '../shared/text/SuccessMessage';
import {LinkButton} from '../shared/form/Button';
import {CenteredBox} from '../shared/layout/CenteredBox';
import React from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {useAuthentication} from '../authentication/useAuthentication';
import {EditAvatarForm} from './EditAvatarForm';

const updateAvatarMutation = gql`
  mutation ($avatar: Upload!) {
    updateAvatar(avatar: $avatar) {
      id
      avatar
    }
  }
`;

const personQuery = gql`
query ($id: ID!) {
  person(personId: $id) {
    avatar
  }
}
`;

export const EditAvatarPage = () => {
  const {personId, firstName} = useAuthentication();

  const [update, {data: updateData, error}] = useMutation(updateAvatarMutation);
  const {data: {person: {avatar} = {}} = {}} = useQuery(personQuery, {variables: {id: parseInt(personId)}});
  const isUpdated = updateData != null && updateData.updateAvatar != null;

  return (
    <CenteredBox>
      <h1>Edit avatar</h1>
      <Card flex>
        {error && <ErrorMessages errors={error.graphQLErrors} maxWidth="600px"/>}
        {isUpdated && <SuccessMessage message="Your avatar is updated">
          <LinkButton primary to={`/people/${updateData.updateAvatar.id}`}>Back to profile</LinkButton>
        </SuccessMessage>}
        {!isUpdated && avatar != null && <EditAvatarForm
          id={personId}
          avatarUrl={avatar}
          firstName={firstName}
          onEdit={input => update({variables: input})}/>}
      </Card>
    </CenteredBox>
  );
};
