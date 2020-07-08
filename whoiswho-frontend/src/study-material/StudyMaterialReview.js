import React from 'react';
import {Card} from '../shared/Card';
import {StudyMaterialRating} from './StudyMaterialRating';
import styled from '@emotion/styled';
import {LighterSpan} from '../shared/text/LighterSpan';
import {Small} from '../shared/Small';

const StudyMaterialTitle = styled.h3`
  margin: 0;
`;

export const StudyMaterialReview = ({person, studyMaterial, rating, completionDate, review}) => (
  <Card>
    <StudyMaterialTitle>
      {studyMaterial.name}
      {` `}
      <Small>Followed at {completionDate.formatString}</Small>
    </StudyMaterialTitle>
    <StudyMaterialRating rating={rating}/>
    <p>&ldquo;{review}&rdquo;</p>
    <LighterSpan>&mdash; {person.firstName} {person.lastName}</LighterSpan>
  </Card>
);
