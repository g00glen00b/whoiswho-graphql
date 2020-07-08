import React from 'react';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {PersonHeader} from './PersonHeader';
import {SkillScoreList} from '../skills/SkillScoreList';
import {StudyMaterialReviewList} from '../study-material/StudyMaterialReviewList';
import {useAuthentication} from '../authentication/useAuthentication';
import {Button, LinkButton} from '../shared/form/Button';
import {ErrorMessages} from '../shared/text/ErrorMessages';

const personQuery = gql`
query ($id: ID!) {
  person(personId: $id) {
    id
    firstName
    lastName
    title
    email
    telephoneNumber
    avatar
    roles
    employmentDate {
      formatString(format: "MMMM yyyy")
    }
    teamCount
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
    skills(sort: {field: EXPERIENCE, order: DESC}) {
      skillName
      level
      experience
      progress
    }
  }
}
`;

const promoteMutation = gql`
mutation ($personId: ID!) {
  promotePerson(personId: $personId) {
    id
    roles
  }
}
`;

const unpromoteMutation = gql`
mutation ($personId: ID!) {
  unpromotePerson(personId: $personId) {
    id
    roles
  }
}
`;

export const PersonDetailPage = ({match: {params: {id}}}) => {
  const {data: {person = {}} = {}} = useQuery(personQuery, {variables: {id}});
  const [promote, {error: promoteError}] = useMutation(promoteMutation);
  const [unpromote, {error: unpromoteError}] = useMutation(unpromoteMutation);
  const {isAdmin, personId} = useAuthentication();
  const isCurrentUser = personId === id;
  const isPersonAdmin = person != null && person.roles != null && person.roles.includes('ADMIN');
  return (
    <div>
      <PersonHeader
        avatar={person.avatar}
        firstName={person.firstName}
        lastName={person.lastName}
        title={person.title}
        courseCount={person.reviews && person.reviews.length}
        employmentDate={person.employmentDate}
        email={person.email}
        teamCount={person.teamCount}
        telephoneNumber={person.telephoneNumber}/>
      {promoteError && <ErrorMessages errors={promoteError.graphQLErrors}/>}
      {unpromoteError && <ErrorMessages errors={unpromoteError.graphQLErrors}/>}
      {isCurrentUser && <LinkButton
        primary
        inverse
        to="/profile/edit">
        Edit profile
      </LinkButton>}
      {` `}
      {isCurrentUser && <LinkButton
        inverse
        to="/profile/avatar/edit">
        Edit avatar
      </LinkButton>}
      {` `}
      {isCurrentUser && <LinkButton
        inverse
        to="/profile/password/edit">
        Edit password
      </LinkButton>}
      {` `}
      {isAdmin && !isCurrentUser && !isPersonAdmin && <Button
        inverse
        onClick={() => promote({variables: {personId: id}})}>
        Promote user
      </Button>}
      {` `}
      {isAdmin && !isCurrentUser && isPersonAdmin &&
      <Button
        inverse
        onClick={() => unpromote({variables: {personId: id}})}>
        Unpromote user
      </Button>}
      <SkillScoreList skills={person.skills}/>
      <StudyMaterialReviewList reviews={person.reviews}/>
    </div>
  );
}
