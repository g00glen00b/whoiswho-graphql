import React from 'react';
import styled from '@emotion/styled';
import {Spacer} from '../layout/Spacer';
import {Button, LinkButton} from '../form/Button';
import {useAuthentication} from '../../authentication/useAuthentication';
import {useLogout} from '../../authentication/useLogout';
import {TextLink} from '../text/TextLink';

const TopNavHeader = styled.header`
  background: ${props => props.theme.secondaryColor};
  padding: 30px 0;
  display: flex;
  justify-content: center;
`;

const TopNavLogo = styled.img`
  width: 42px;
  margin-right: 16px;
  
  @media (max-width: 960px) {
    margin-right: 5px;
  }
  
  @media (max-width: 640px) {
    margin-right: 0;
  }
`;

const TopNavContainer = styled.div`
  max-width: ${props => props.theme.width};
  padding: 0 20px;
  width: 100%;
  display: flex;
  align-items: center;
  
  > * {
    text-transform: uppercase;
    text-decoration: none;
    color: ${props => props.theme.secondaryTextColor};
    font-weight: 500;
    font-size: 17px;
    margin-right: 40px;
    
    @media (max-width: 960px) {
      margin-right: 10px;
      font-size: 15px;
    }
    
    &:last-child {
      margin-right: 0;
    }
  }
  
  > *.active {
    color: ${props => props.theme.primaryColor};
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
    
    > * {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
`;

const TopNavBrand = styled.strong`
  color: ${props => props.theme.secondaryTextColor};
  font-size: 20px;
  text-transform: none;
`;

export const TopNav = ({name, children}) => {
  const {isAuthenticated, firstName, personId} = useAuthentication();
  const {logout} = useLogout();

  return (
    <TopNavHeader>
      <TopNavContainer>
        <TopNavLogo src={`${process.env.PUBLIC_URL}/logo.png`}/>
        <TopNavBrand>{name}</TopNavBrand>
        {children}
        <Spacer/>
        {!isAuthenticated && <LinkButton to="/login" primary>Log in</LinkButton>}
        {isAuthenticated && <TextLink inverse to={`/people/${personId}`}>Hey {firstName}</TextLink>}
        {isAuthenticated && <Button primary type="button" onClick={() => logout(true)}>Log out</Button>}
      </TopNavContainer>
    </TopNavHeader>
  );
};
