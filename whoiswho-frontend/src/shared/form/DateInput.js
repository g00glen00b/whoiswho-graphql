import React from 'react';
import DatePicker from 'react-datepicker';
import styled from '@emotion/styled';

export const DateInput = styled(({...props}) => <DatePicker
  placeholderText={props.placeholder}
  dateFormat="yyyy/MM/dd"
  selected={props.value}
  {...props}/>)`
  background-color: ${props => props.theme.backgroundColorDarker};
  border: none;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  
  &::placeholder {
    text-transform: uppercase;
    color: ${props => props.theme.textColorLighter};
    font-weight: 500;
  }
`;
