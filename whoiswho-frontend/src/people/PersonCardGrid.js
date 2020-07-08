import React from 'react';
import {PersonCard} from './PersonCard';
import {EvenGrid} from '../shared/layout/EvenGrid';

export const PersonCardGrid = ({people}) => (
  <EvenGrid minWidth="190px">
    {people && people.map(({id, firstName, lastName, avatar, title, skills, email, telephoneNumber}) => (
      <PersonCard
        key={id}
        id={id}
        firstName={firstName}
        lastName={lastName}
        avatar={avatar}
        title={title}
        skills={skills}
        email={email}
        telephoneNumber={telephoneNumber}/>
    ))}
  </EvenGrid>
);
