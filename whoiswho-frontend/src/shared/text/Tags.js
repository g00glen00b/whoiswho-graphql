import React from 'react';
import styled from '@emotion/styled';
import {Tag} from './Tag';

const TagContainer = styled.span`
  display: block;
  margin-bottom: 10px;
  margin: 0 -5px;
  overflow: hidden;
`;

export const Tags = ({tags, meta}) => (
  <TagContainer>
    {tags && tags
      .filter(tag => tag)
      .map(name => <Tag key={name}>{name}</Tag>)}
    {meta && meta
      .filter(metaTag => metaTag)
      .map(name => <Tag secondary key={name}>{name}</Tag>)}
  </TagContainer>
);
