import React from 'react';
import {Card} from '../shared/Card';
import {ErrorMessages} from '../shared/text/ErrorMessages';
import {SuccessMessage} from '../shared/text/SuccessMessage';
import {LinkButton} from '../shared/form/Button';
import {CenteredBox} from '../shared/layout/CenteredBox';
import {CreateStudyMaterialReviewForm} from './CreateStudyMaterialReviewForm';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

const createReviewMutation = gql`
  mutation ($input: CreateStudyMaterialReviewInput!) {
    review(input: $input) {
      studyMaterial {
        name
      }
    }
  }
`;

export const CreateStudyMaterialReviewPage = ({match: {params: {id}}}) => {
  const [review, {data, error}] = useMutation(createReviewMutation);
  const isCreated = data && data.review;
  return (
    <CenteredBox>
      <h1>Write a review</h1>
      <Card flex>
        {error && <ErrorMessages errors={error.graphQLErrors} maxWidth="600px"/>}
        {isCreated && <SuccessMessage message={`The review for "${data.review.studyMaterial.name}" has been created.`}>
          <LinkButton primary to={`/material/${id}`}>Go back</LinkButton>
        </SuccessMessage>}
        {!isCreated && <CreateStudyMaterialReviewForm
          id={id}
          onCreate={input => review({variables: {input: {...input, id}}})}/>}
      </Card>
    </CenteredBox>
  );
}
