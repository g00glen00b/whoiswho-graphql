import {Link} from 'react-router-dom';
import styled from '@emotion/styled';
import React from 'react';

export const TextLink = styled(({inverse, ...props}) => <Link {...props}/>)`
  text-decoration: none;
  color: ${props => props.inverse ? props.theme.secondaryTextColor : props.theme.textColor};
  font-weight: 400;
  text-transform: none;
`;
