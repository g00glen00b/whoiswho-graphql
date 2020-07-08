import React from 'react';
import {EvenGrid} from '../shared/layout/EvenGrid';
import {StudyMaterialReview} from './StudyMaterialReview';
import {LighterSpan} from '../shared/text/LighterSpan';

export const StudyMaterialReviewList = ({reviews}) => (
  <div>
    <h2>Reviews</h2>
    <EvenGrid minWidth="400px">
      {reviews && reviews.map(({person, review, rating, studyMaterial, completionDate}) => <StudyMaterialReview
        key={`${studyMaterial.id}_${person.id}`}
        rating={rating}
        completionDate={completionDate}
        person={person}
        review={review}
        studyMaterial={studyMaterial}/>)}
      {reviews && reviews.length === 0 && <p><LighterSpan>None yet.</LighterSpan></p>}
    </EvenGrid>
  </div>
);
