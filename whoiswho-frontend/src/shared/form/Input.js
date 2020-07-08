import styled from '@emotion/styled';

export const Input = styled.input`
  background-color: ${props => props.theme.backgroundColorDarker};
  border: none;
  padding: 10px;
  font-size: 16px;
  
  &::placeholder {
    text-transform: uppercase;
    color: ${props => props.theme.textColorLighter};
    font-weight: 500;
  } 
`;
