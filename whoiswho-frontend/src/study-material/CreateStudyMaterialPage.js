import React from 'react';
import {Card} from '../shared/Card';
import {ErrorMessages} from '../shared/text/ErrorMessages';
import {CenteredBox} from '../shared/layout/CenteredBox';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {CreateStudyMaterialForm} from './CreateStudyMaterialForm';
import {SuccessMessage} from '../shared/text/SuccessMessage';
import {LinkButton} from '../shared/form/Button';

const createStudyMaterialMutation = gql`
  mutation ($input: CreateStudyMaterialInput!) {
    createStudyMaterial(input: $input) {
      name
    }
  }
`;


export const CreateStudyMaterialPage = () => {
  const [create, {data, error}] = useMutation(createStudyMaterialMutation);
  const isCreated = data && data.createStudyMaterial;

  return (
    <CenteredBox>
      <h1>Create new study material</h1>
      <Card flex>
        {error && <ErrorMessages errors={error.graphQLErrors} maxWidth="600px"/>}
        {isCreated && <SuccessMessage message="The study material has been created and will be available soon.">
          <LinkButton primary to="/material">Go back</LinkButton>
        </SuccessMessage>}
        {!isCreated && <CreateStudyMaterialForm onCreate={input => create({variables: {input}})}/>}
      </Card>
    </CenteredBox>
  );
};
