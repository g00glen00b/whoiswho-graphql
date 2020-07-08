import React from 'react';
import {MdStar} from 'react-icons/md';
import {range} from '../shared/helpers';
import {LighterSpan} from '../shared/text/LighterSpan';

export const StudyMaterialRating = ({rating, completedCount}) => (
  <>
    {rating > 0 && [...range(1, rating)].map(star => <MdStar key={star}/>)}
    {completedCount === 1 && <span>&nbsp;by 1 person</span>}
    {completedCount > 1 && <span>&nbsp;by {completedCount} people</span>}
    {rating === 0 && <LighterSpan title="Not applicable">n/a</LighterSpan>}
  </>
);
