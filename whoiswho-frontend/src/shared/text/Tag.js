import styled from '@emotion/styled';

export const Tag = styled.span`
  background-color: ${props => props.secondary ? props.theme.backgroundColorDarker : props.theme.primaryColorLight};
  border-radius: 5px;
  font-size: 14px;
  font-weight: 300;
  padding: 2px 5px;
  margin: 0 5px;
`;
