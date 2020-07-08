import {range} from '../helpers';
import {MdStar, MdStarBorder} from 'react-icons/md';
import React, {useState} from 'react';
import styled from '@emotion/styled';
import {useTheme} from 'emotion-theming';

const InputRatingContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 24px;
`;

export const InputRating = ({value = 0, max = 5, onChange}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const theme = useTheme();

  return (
    <InputRatingContainer>
      {[...range(1, max)].map((nr => nr <= value || nr <= hoverRating ? (
        <MdStar
          key={nr}
          color={nr <= hoverRating ? theme.primaryColor : theme.textColor}
          onMouseOver={() => setHoverRating(nr)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onChange(nr)}/>
      ) : (
        <MdStarBorder
          key={nr}
          onMouseOver={() => setHoverRating(nr)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onChange(nr)}/>
      )))}
    </InputRatingContainer>
  );
}
