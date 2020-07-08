import styled from '@emotion/styled';

export const GridElement = styled.div`
  grid-column-start: ${props => props.columnStart || 1};
  grid-column-end: ${props => props.columnEnd || 2};
  grid-row-start: ${props => props.rowStart || 1};
  grid-row-end: ${props => props.rowEnd || 2};
  text-align: ${props => props.right ? 'right' : 'left'};
`;
