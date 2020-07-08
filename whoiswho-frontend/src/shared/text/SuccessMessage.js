import {Column} from '../layout/Column';
import React from 'react';
import styled from '@emotion/styled';

const SuccessTitle = styled.h3`
  color: ${props => props.theme.successColor};
  margin-bottom: 0;
  text-align: center;
`;

const Message = styled.p`
  color: ${props => props.theme.textColorLighter};
  text-align: center;
`;

export const SuccessMessage = ({message, children}) => (
  <Column>
    <SuccessTitle>Success</SuccessTitle>
    <Message>{message}</Message>
    {children}
  </Column>
);
