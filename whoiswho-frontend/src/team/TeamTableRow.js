import React from 'react';
import {TextLink} from '../shared/text/TextLink';

export const TeamTableRow = ({id, name, leader, memberCount}) => (
  <tr>
    <td><TextLink to={`/teams/${id}`}>{name}</TextLink></td>
    <td>{leader && <TextLink to={`/people/${leader.id}`}>{leader.firstName} {leader.lastName}</TextLink>}</td>
    <td>{memberCount}</td>
  </tr>
);
