import gql from 'graphql-tag';
import {Card} from '../shared/Card';
import {ErrorMessages} from '../shared/text/ErrorMessages';
import {SuccessMessage} from '../shared/text/SuccessMessage';
import {LinkButton} from '../shared/form/Button';
import {CenteredBox} from '../shared/layout/CenteredBox';
import React from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {useAuthentication} from '../authentication/useAuthentication';
import {EditProfileForm} from './EditProfileForm';
import {authenticationId} from '../ApiClient';
import {authenticationQuery} from '../authentication/queries';

const updatePersonMutation = gql`
  mutation ($input: UpdatePersonInput!) {
    updatePerson(input: $input) {
      id
      firstName
    }
  }
`;

const personQuery = gql`
query ($id: ID!) {
  person(personId: $id) {
    firstName
    lastName
    title
    telephoneNumber
    employmentDate {
      iso
    }
  }
}
`;

export const EditProfilePage = () => {
  const {personId, ...authentication} = useAuthentication();
  const updateCache = (cache, {data: {updatePerson: {firstName}}}) => {
    const result = {
      id: authenticationId,
      ...authentication,
      personId,
      firstName,
      __typename: 'Authentication'
    };
    cache.writeQuery({query: authenticationQuery, data: {authentication: result}});
  };

  const [update, {data: updateData, error}] = useMutation(updatePersonMutation, {update: updateCache});
  const {data} = useQuery(personQuery, {variables: {id: parseInt(personId)}});
  const isUpdated = updateData != null && updateData.updatePerson != null;

  return (
    <CenteredBox>
      <h1>Edit profile</h1>
      <Card flex>
        {error && <ErrorMessages errors={error.graphQLErrors} maxWidth="600px"/>}
        {isUpdated && <SuccessMessage message="Your profile is updated">
          <LinkButton primary to={`/people/${updateData.updatePerson.id}`}>Back to profile</LinkButton>
        </SuccessMessage>}
        {!isUpdated && data != null && <EditProfileForm
          id={personId}
          profile={data.person}
          onEdit={input => update({variables: {input}})}/>}
      </Card>
    </CenteredBox>
  );
};
