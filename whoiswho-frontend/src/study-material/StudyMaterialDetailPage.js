import React from 'react';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Tags} from '../shared/text/Tags';
import {StudyMaterialReviewList} from './StudyMaterialReviewList';
import {StudyMaterialRating} from './StudyMaterialRating';
import {Grid} from '../shared/layout/Grid';
import {GridElement} from '../shared/layout/GridElement';
import {GridTitle} from '../shared/layout/GridTitle';
import {Button, LinkButton} from '../shared/form/Button';
import {ErrorMessages} from '../shared/text/ErrorMessages';
import {useAuthentication} from '../authentication/useAuthentication';

const studyMaterialQuery = gql`
query ($id: ID!) {
  studyMaterial(studyMaterialId: $id) {
    id
    name
    type {
      description
    }
    skills
    duration {
      toHours
    }
    complexity {
      description
    }
    approved
    averageRating
    reviews {
      completionDate {
        formatString(format: "dd/MM/yyyy")
      }
      rating
      review
      person {
        id
        firstName
        lastName
      }
      studyMaterial {
        id
        name
      }
    }
    completed
    completedCount
  }
}
`;

const approveMutation = gql`
  mutation ($id: ID!) {
    approveStudyMaterial(studyMaterialId: $id) {
      id
      approved
    }
  }
`;

const unapproveMutation = gql`
  mutation ($id: ID!) {
    unapproveStudyMaterial(studyMaterialId: $id) {
      id
      approved
    }
  }
`;

export const StudyMaterialDetailPage = ({match: {params: {id}}}) => {
  const {data: {studyMaterial = {}} = {}} = useQuery(studyMaterialQuery, {variables: {id}});
  const [approve, {error: approveError}] = useMutation(approveMutation, {variables: {id}});
  const [unapprove, {error: unapproveError}] = useMutation(unapproveMutation, {variables: {id}});
  const {isAdmin, isAuthenticated} = useAuthentication();
  const canReview = !studyMaterial.completed && isAuthenticated && studyMaterial.approved;
  const canApprove = isAdmin && !studyMaterial.approved;
  const canUnapprove = isAdmin && studyMaterial.approved;
  return (
    <Grid
      templateRows="fit-content(100px) fit-content(50px) auto"
      templateColumns="auto fit-content(250px)">
      <GridElement>
        <GridTitle>{studyMaterial.name}</GridTitle>
      </GridElement>
      <GridElement
        rowStart={1}
        columnStart={2}
        right>
        <StudyMaterialRating
          completedCount={studyMaterial.completedCount}
          rating={studyMaterial.averageRating}/>
      </GridElement>
      <GridElement rowStart={2}>
        <Tags
          tags={studyMaterial.skills}
          meta={[
            studyMaterial.completed && 'Completed',
            studyMaterial.complexity && studyMaterial.complexity.description,
            studyMaterial.type && studyMaterial.type.description,
            !studyMaterial.approved && 'Unapproved',
          ]}/>
      </GridElement>
      <GridElement rowStart={3} rowEnd={4} columnStart={1} columnEnd={3}>
        {approveError && <ErrorMessages errors={approveError.graphQLErrors}/>}
        {unapproveError && <ErrorMessages errors={unapproveError.graphQLErrors}/>}
        {canReview && <LinkButton primary inverse to={`/material/${id}/review/create`}>Write review</LinkButton>}
        {` `}
        {canApprove && <Button secondary inverse onClick={approve}>Approve</Button>}
        {` `}
        {canUnapprove && <Button secondary inverse onClick={unapprove}>Unapprove</Button>}
      </GridElement>
      <GridElement rowStart={4} rowEnd={5} columnStart={1} columnEnd={3}>
        <StudyMaterialReviewList reviews={studyMaterial.reviews}/>
      </GridElement>
    </Grid>
  );
}
