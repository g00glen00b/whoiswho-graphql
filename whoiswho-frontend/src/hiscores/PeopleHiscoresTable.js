import React from 'react';
import {Table} from '../shared/Table';
import {TextLink} from '../shared/text/TextLink';

export const PeopleHiscoresTable = ({hiscores, offsetRank}) => (
  <Table>
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Name</th>
        <th>Level</th>
        <th>Experience</th>
      </tr>
    </thead>
    <tbody>
    {hiscores && hiscores.map(({person, experience, level}, index) => <tr
      key={person.id}>
      <td>{offsetRank + index + 1}.</td>
      <td>
        <TextLink to={`/people/${person.id}`}>
          {person.firstName} {person.lastName}
        </TextLink>
      </td>
      <td>{level}</td>
      <td>{experience.toLocaleString()}</td>
    </tr>)}
    </tbody>
  </Table>
);
