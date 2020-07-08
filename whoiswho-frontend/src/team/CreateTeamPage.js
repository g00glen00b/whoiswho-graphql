import React from 'react';
import {Card} from '../shared/Card';
import {ErrorMessages} from '../shared/text/ErrorMessages';
import {CenteredBox} from '../shared/layout/CenteredBox';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {SuccessMessage} from '../shared/text/SuccessMessage';
import {LinkButton} from '../shared/form/Button';
import {CreateTeamForm} from './CreateTeamForm';

const createTeamMutation = gql`
  mutation ($name: String!) {
    createTeam(name: $name) {
      id
      name
    }
  }
`;


export const CreateTeamPage = () => {
  const [create, {data, error}] = useMutation(createTeamMutation);
  const isCreated = data && data.createTeam;

  return (
    <CenteredBox>
      <h1>Create a team</h1>
      <Card flex>
        {error && <ErrorMessages errors={error.graphQLErrors} maxWidth="600px"/>}
        {isCreated && <SuccessMessage message={`Team ${data.createTeam.name} has been created.`}>
          <LinkButton primary to={`/teams/${data.createTeam.id}`}>Go to your team</LinkButton>
        </SuccessMessage>}
        {!isCreated && <CreateTeamForm onCreate={variables => create({variables})}/>}
      </Card>
    </CenteredBox>
  );
};
