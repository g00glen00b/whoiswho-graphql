import {GridElement} from '../shared/layout/GridElement';
import {Grid} from '../shared/layout/Grid';
import React from 'react';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Button, LinkButton} from '../shared/form/Button';
import {GridTitle} from '../shared/layout/GridTitle';
import {SkillScoreList} from '../skills/SkillScoreList';
import {TeamMemberCardGrid} from './TeamMemberCardGrid';
import {useAuthentication} from '../authentication/useAuthentication';
import {SuccessMessage} from '../shared/text/SuccessMessage';
import {ErrorMessages} from '../shared/text/ErrorMessages';

const teamQuery = gql`
query ($id: ID!) {
  team(teamId: $id) {
    id
    name
    leader {
      id
      firstName
      lastName
    }
    isLeader
    isMember
    members(withUnapproved: true) {
      approved
      person {
        id
        firstName
        lastName
        avatar
        title
        skills(size: 3, sort: {field: EXPERIENCE, order: DESC}) {
          skillName
        }
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

const approveMutation = gql`
  mutation ($teamId: ID!, $personId: ID!) {
    approveTeamMember(teamId: $teamId, personId: $personId) {
      id
      isLeader
      isMember
      members(withUnapproved: true) {
        approved
        person {
          id
          firstName
          lastName
          avatar
          title
          skills(size: 3, sort: {field: EXPERIENCE, order: DESC}) {
            skillName
          }
        }
      }
    }
  }
`;

const joinMutation = gql`
  mutation ($teamId: ID!) {
    joinTeam(teamId: $teamId) {
      id
      isLeader
      isMember
      members(withUnapproved: true) {
        approved
        person {
          id
          firstName
          lastName
          avatar
          title
          skills(size: 3, sort: {field: EXPERIENCE, order: DESC}) {
            skillName
          }
        }
      }
    }
  }
`;

const leaveMutation = gql`
  mutation ($teamId: ID!) {
    leaveTeam(teamId: $teamId) {
      id
      isLeader
      isMember
      members(withUnapproved: true) {
        approved
        person {
          id
          firstName
          lastName
          avatar
          title
          skills(size: 3, sort: {field: EXPERIENCE, order: DESC}) {
            name
          }
        }
      }
    }
  }
`;

const assignMutation = gql`
  mutation ($teamId: ID!, $personId: ID!) {
    replaceTeamLeader(teamId: $teamId, personId: $personId) {
      id
      isLeader
      isMember
    }
  }
`;

const deleteMutation = gql`
  mutation ($teamId: ID!) {
    deleteTeam(teamId: $teamId)
  }
`;

export const TeamDetailPage = ({match: {params: {id}}}) => {
  const {data: {team = {}} = {}} = useQuery(teamQuery, {variables: {id}});
  const [approve, {error: approveError}] = useMutation(approveMutation);
  const [join, {error: joinError}] = useMutation(joinMutation);
  const [leave, {error: leaveError}] = useMutation(leaveMutation);
  const [assign, {error: assignError}] = useMutation(assignMutation);
  const [deleteTeam, {data: deleteData, error: deleteError}] = useMutation(deleteMutation);
  const {isAuthenticated, personId} = useAuthentication();
  const isLeader = team.isLeader && isAuthenticated;
  const isMember = team.isMember && isAuthenticated;
  return (
    <Grid
      templateRows="fit-content(100px) fit-content(50px) auto auto"
      templateColumns="auto">
      <GridElement>
        <GridTitle>{team.name}</GridTitle>
      </GridElement>
      {approveError && <ErrorMessages errors={approveError.graphQLErrors}/>}
      {joinError && <ErrorMessages errors={joinError.graphQLErrors}/>}
      {leaveError && <ErrorMessages errors={leaveError.graphQLErrors}/>}
      {assignError && <ErrorMessages errors={assignError.graphQLErrors}/>}
      {deleteError && <ErrorMessages errors={deleteError.graphQLErrors}/>}
      {!deleteData && <GridElement rowStart={2} rowEnd={3}>
        {!isLeader && isMember && <Button
          inverse
          onClick={() => leave({variables: {teamId: id}})}>
          Leave team
        </Button>}
        {isLeader && <Button
          inverse
          onClick={() => deleteTeam({variables: {teamId: id}})}>
          Delete team
        </Button>}
        {!isMember && isAuthenticated && <Button
          seccondary
          inverse
          onClick={() => join({variables: {teamId: id}})}>
          Join team
        </Button>}
      </GridElement>}
      {!deleteData && <GridElement rowStart={3} rowEnd={4}>
        <SkillScoreList skills={team.skills} title="Average levels"/>
      </GridElement>}
      {!deleteData && <GridElement rowStart={4} rowEnd={5}>
        <h2>Members</h2>
        <TeamMemberCardGrid
          members={team.members}
          isLeader={team.isLeader}
          isMember={team.isMember}
          currentUserId={personId}
          onApprove={({personId}) => approve({variables: {personId, teamId: id}})}
          onAssign={({personId}) => assign({variables: {personId, teamId: id}})}/>
      </GridElement>}
      {deleteData && <SuccessMessage message="The team is deleted.">
        <LinkButton primary to="/teams">Go back</LinkButton>
      </SuccessMessage>}
    </Grid>
  );
}
