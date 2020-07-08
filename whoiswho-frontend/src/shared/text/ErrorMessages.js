import React from 'react';
import {MdErrorOutline} from 'react-icons/md';
import styled from '@emotion/styled';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: ${props => props.maxWidth || '100%'};
  
  > * {
    padding-right: 10px;
    
    &:last-child {
      padding-right: 0;
    }
  }
  
  * {
    color: ${props => props.theme.dangerColor};
  }
`;

export const ErrorMessages = ({errors, maxWidth}) => (
  <ErrorContainer maxWidth={maxWidth}>
    <MdErrorOutline size="32px"/>
    <p>{errors && errors.map(({message}) => [
      <span>{message}</span>,
      <br/>
    ])}</p>
  </ErrorContainer>
);
