import styled from '@emotion/styled';

export const ColumnGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  
  > *:first-child {
    padding-left: 0;
  }
  
  > *:last-child {
    padding-right: 0;
  }
  
  @media (max-width: 640px) {
    display: block;
  }
`;
