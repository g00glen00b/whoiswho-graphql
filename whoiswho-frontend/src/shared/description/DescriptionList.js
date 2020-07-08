import styled from '@emotion/styled';

export const DescriptionList = styled.dl`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  font-size: 20px;
  margin-top: 0;
  
  > * {
   margin-right: 50px;
  }
  
  @media (max-width: 640px) {
    display: block;
    
    * {
      display: inline-block;
    }
  }
`;
