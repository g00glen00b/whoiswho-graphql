import styled from '@emotion/styled';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  align-items: ${props => props.centered ? 'center' : 'initial'}; 
  flex: 1;
  min-width: ${props => props.minWidth || '0'};
  padding: ${props => props.padding || '0'};
  
  @media (max-width: 640px) {
    padding: 0;
  }
`;
