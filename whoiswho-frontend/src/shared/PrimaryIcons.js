import styled from '@emotion/styled';
import {withTheme} from 'emotion-theming';
import {IconContext} from 'react-icons';
import React from 'react';

const IconRow = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 24px;
`;

const PrimaryIconContext = withTheme(({theme, children}) => (
  <IconContext.Provider value={{color: theme.primaryColor, size: '24px'}}>
    {children}
  </IconContext.Provider>
));

export const PrimaryIcons = ({children}) => (
  <IconRow>
    <PrimaryIconContext>
      {children}
    </PrimaryIconContext>
  </IconRow>
);
