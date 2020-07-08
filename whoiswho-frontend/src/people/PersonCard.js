import React from 'react';
import {PersonAvatar} from './PersonAvatar';
import styled from '@emotion/styled';
import {MdMail, MdPhone} from 'react-icons/md';
import {PrimaryIcons} from '../shared/PrimaryIcons';
import {Card} from '../shared/Card';
import {Small} from '../shared/Small';
import {Tags} from '../shared/text/Tags';
import {TextLink} from '../shared/text/TextLink';

const PersonTitle = styled.h2`
  text-align: center;
  font-size: 20px;
  margin-bottom: 5px;
`;

export const PersonCard = ({id, firstName, lastName, title, avatar, email, telephoneNumber, skills}) => (
  <Card flex>
    <PersonAvatar
      width="100px"
      avatar={avatar}
      firstName={firstName}/>
    <PersonTitle>
      <TextLink to={`/people/${id}`}>{firstName} {lastName}</TextLink><br/>
      <Small>{title}</Small>
    </PersonTitle>
    <Tags tags={skills.map(({skillName}) => skillName)}/>
    <br/>
    <PrimaryIcons>
      {email && <a
        href={`mailto:${email}`}
        target="_blank"
        rel="noopener noreferrer"
        title={`Send an email to ${firstName}`}>
        <MdMail/>
      </a>}
      {telephoneNumber && <a
        href={`tel:${telephoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        title={`Call ${firstName}`}>
        <MdPhone/>
      </a>}
    </PrimaryIcons>
  </Card>
);
