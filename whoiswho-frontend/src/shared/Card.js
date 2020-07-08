import styled from '@emotion/styled';

export const Card = styled.div`
  border-radius: 10px;
  border: solid 1px ${props => props.theme.borderColor};
  padding: 30px;
  display: ${props => props.flex ? 'flex' : 'block'};
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15);
`;

