import React from 'react';
import styled from '@emotion/styled';


const PersonAvatarImage = styled.img`
  border-radius: 50%;
  max-width: ${props => props.width || '100px'};
  max-height: ${props => props.width || 'inherit'};
  border: solid 1px ${props => props.theme.borderColor};
  padding: 5px;
`;

export const PersonAvatar = ({firstName, avatar, width}) => (
  <PersonAvatarImage src={avatar} alt={`${firstName}'s avatar`} width={width}/>
);
