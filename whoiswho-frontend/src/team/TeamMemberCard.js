import React from 'react';
import styled from '@emotion/styled';
import {Card} from '../shared/Card';
import {Small} from '../shared/Small';
import {Tags} from '../shared/text/Tags';
import {TextLink} from '../shared/text/TextLink';
import {Button} from '../shared/form/Button';
import {PersonAvatar} from '../people/PersonAvatar';

const TeamMemberTitle = styled.h2`
  text-align: center;
  font-size: 20px;
  margin-bottom: 5px;
`;

export const TeamMemberCard = ({id, firstName, lastName, title, avatar, skills, approved, isLeader, isCurrentUser, onApprove, onAssign}) => (
  <Card flex>
    <PersonAvatar
      width="100px"
      avatar={avatar}
      firstName={firstName}/>
    <TeamMemberTitle>
      <TextLink to={`/people/${id}`}>{firstName} {lastName}</TextLink><br/>
      <Small>{title}</Small>
    </TeamMemberTitle>
    <Tags tags={skills.map(({name}) => name)}/>
    <br/>
    {!approved && isLeader && <Button
      secondary
      inverse
      onClick={() => onApprove({personId: id})}>
      Approve
    </Button>}
    {approved && isLeader && !isCurrentUser && <Button
      secondary
      inverse
      onClick={() => onAssign({personId: id})}>
      Assign as leader
    </Button>}
  </Card>
);
