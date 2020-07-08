import React from 'react';
import {StudyMaterialRating} from './StudyMaterialRating';
import {Tags} from '../shared/text/Tags';
import {TextLink} from '../shared/text/TextLink';

export const StudyMaterialTableRow = ({id, completed, complexity, name, skills, duration, averageRating, completedCount, type, approved}) => (
  <tr>
    <td>
      <TextLink to={`/material/${id}`}>{name}</TextLink>
      <br />
      <Tags
        tags={skills}
        meta={[
          completed && 'Completed',
          complexity && complexity.description,
          type && type.description,
          !approved && 'Unapproved',
        ]}/>
    </td>
    <td>
      <StudyMaterialRating rating={averageRating} completedCount={completedCount}/>
    </td>
    <td>
      {duration && <span>{duration.toHours} hours</span>}
    </td>
  </tr>
);
