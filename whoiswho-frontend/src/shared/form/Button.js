import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import React from 'react';

const getColor = props => props.primary ? props.theme.primaryColor : props.theme.secondaryColor;

export const LinkButton = styled(({primary, inverse, ...props}) => <Link {...props}/>)`
  display: inline-flex;
  align-items: center;
  color: white;
  background: ${props => props.inverse ? 'transparent' : getColor(props)};
  border: solid 1px ${props => getColor(props)};
  color: ${props => props.inverse ? getColor(props) : props.theme.secondaryTextColor};
  text-transform: uppercase;
  font-size: 17px;
  font-weight: 500;
  padding: 8px 25px;
  text-decoration: none;
  transition: color .3s, background .3s;
  justify-content: center;
  
  * {
    transition: color .3s, background .3s;
    color: ${props => props.inverse ? getColor(props) : props.theme.secondaryTextColor};
  }
  
  &:hover {
    background: ${props => props.inverse ? getColor(props) : 'transparent'};
    color: ${props => props.inverse ? props.theme.secondaryTextColor : getColor(props)};
    
    * {
      transition: color .3s, background .3s;
      color: ${props => props.inverse ? props.theme.secondaryTextColor : getColor(props)};
    }
  }
  
  &[disabled] {
    cursor: not-allowed;
    background: transparent;
    color: ${props => props.theme.textColorLighter};
    border: solid 1px ${props => props.theme.textColorLighter};
    
    * {
      transition: color .3s, background .3s;
      color: ${props => props.theme.textColorLighter};
    }
  }
`;

export const Button = LinkButton.withComponent('button');

export const AnchorButton = LinkButton.withComponent('a');
