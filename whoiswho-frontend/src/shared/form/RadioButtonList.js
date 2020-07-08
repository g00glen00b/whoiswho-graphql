import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 5px;
`;

export const RadioButtonList = ({name, code, options = [], keyFn = option => option.code, descriptionFn = option => option.description, onSelect}) => (
  <Container>
    {options && options.map(option => (
      <label key={keyFn(option)}>
        <input
          type="radio"
          name={name}
          value={keyFn(option)}
          checked={keyFn(option) === code}
          onChange={event => onSelect(event.currentTarget.value)}/>
        {` `}
        {descriptionFn(option)}
      </label>
    ))}
  </Container>
);
