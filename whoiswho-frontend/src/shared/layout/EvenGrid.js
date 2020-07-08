import styled from '@emotion/styled';

export const EvenGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.minWidth || '1fr'}, 1fr));
  grid-gap: 20px;
`;
