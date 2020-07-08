import React from 'react';
import {TeamTableRow} from './TeamTableRow';
import {Table} from '../shared/Table';

export const TeamTable = ({teams}) => (
  <Table>
    <thead>
      <tr>
        <th>Team</th>
        <th>Leader</th>
        <th>Members</th>
      </tr>
    </thead>
    <tbody>
      {teams && teams.map(({id, name, leader, memberCount}) => (
        <TeamTableRow
          key={id}
          id={id}
          name={name}
          leader={leader}
          memberCount={memberCount}/>
      ))}
    </tbody>
  </Table>
);
