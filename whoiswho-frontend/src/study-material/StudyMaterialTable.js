import React from 'react';
import {StudyMaterialTableRow} from './StudyMaterialTableRow';
import {Table} from '../shared/Table';

export const StudyMaterialTable = ({studyMaterials}) => (
  <Table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Rating</th>
        <th>Duration</th>
      </tr>
    </thead>
    <tbody>
      {studyMaterials && studyMaterials.map(({id, completed, complexity, name, skills, duration, averageRating, completedCount, type, approved}) => (
        <StudyMaterialTableRow
          key={id}
          id={id}
          complexity={complexity}
          completed={completed}
          name={name}
          skills={skills}
          duration={duration}
          averageRating={averageRating}
          completedCount={completedCount}
          type={type}
          approved={approved}/>
      ))}
    </tbody>
  </Table>
);
