import styled from '@emotion/styled';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.templateColumns};
  grid-template-rows: ${props => props.templateRows};
  grid-gap: 20px;
  margin-top: 20px;
  align-items: center;
  max-width: 100%;
  
  @media (max-width: 640px) {
    display: block;
  }
`;
