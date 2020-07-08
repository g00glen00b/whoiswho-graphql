import styled from '@emotion/styled';

export const Table = styled.table`
  width: 100%;
  margin-bottom: 10px;
  
  tr > * {
    text-align: left;
    border-bottom: solid 1px ${props => props.theme.borderColor};
    padding: 10px 0;
  }
  
  tr > *:last-child {
    text-align: right;
  }
`;
