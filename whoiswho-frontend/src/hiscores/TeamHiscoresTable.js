import React from 'react';
import {Table} from '../shared/Table';
import {TextLink} from '../shared/text/TextLink';

export const TeamHiscoresTable = ({hiscores, offsetRank}) => (
  <Table>
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Team</th>
        <th>Average level</th>
        <th>Total experience</th>
      </tr>
    </thead>
    <tbody>
    {hiscores && hiscores.map(({team, experience, level}, index) => <tr
      key={team.id}>
      <td>{offsetRank + index + 1}.</td>
      <td>
        <TextLink to={`/teams/${team.id}`}>
          {team.name}
        </TextLink>
      </td>
      <td>{level}</td>
      <td>{experience.toLocaleString()}</td>
    </tr>)}
    </tbody>
  </Table>
);
