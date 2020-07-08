import React from 'react';
import {TeamMemberCard} from './TeamMemberCard';
import {EvenGrid} from '../shared/layout/EvenGrid';

export const TeamMemberCardGrid = ({members, isLeader, isMember, currentUserId, onAssign, onApprove}) => (
  <EvenGrid minWidth="190px">
    {members && members.map(({person: {id, firstName, lastName, avatar, title, skills}, approved}) => (
      <TeamMemberCard
        key={id}
        id={id}
        firstName={firstName}
        lastName={lastName}
        avatar={avatar}
        title={title}
        skills={skills}
        approved={approved}
        isLeader={isLeader}
        isMember={isMember}
        isCurrentUser={currentUserId === id}
        onApprove={onApprove}
        onAssign={onAssign}/>
    ))}
  </EvenGrid>
);
