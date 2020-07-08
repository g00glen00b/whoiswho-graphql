import React from 'react';
import {PersonAvatar} from './PersonAvatar';
import {Small} from '../shared/Small';
import {DescriptionList} from '../shared/description/DescriptionList';
import {Description} from '../shared/description/Description';
import {DescriptionTerm} from '../shared/description/DescriptionTerm';
import {DescriptionDivider} from '../shared/description/DescriptionDivider';
import {GridElement} from '../shared/layout/GridElement';
import {Grid} from '../shared/layout/Grid';
import {GridTitle} from '../shared/layout/GridTitle';

export const PersonHeader = ({avatar, firstName, lastName, title, courseCount, teamCount, employmentDate, email, telephoneNumber}) => (
  <Grid templateColumns="150px auto" templateRows="70px 80px">
    <GridElement rowEnd={3}>
      {avatar && <PersonAvatar
        firstName={firstName}
        avatar={avatar}
        width="150px"/>}
    </GridElement>
    <GridElement columnStart={2} columnEnd={3}>
      <GridTitle>
        {firstName} {lastName}
        <br />
        <Small>{title}</Small>
      </GridTitle>
    </GridElement>
    <GridElement columnStart={2} columnEnd={3} rowStart={2} rowEnd={3}>
      <DescriptionList>
        <DescriptionDivider>
          <Description>{courseCount || 0}</Description>
          <DescriptionTerm>Courses</DescriptionTerm>
        </DescriptionDivider>
        <DescriptionDivider>
          <Description>{teamCount || 0}</Description>
          <DescriptionTerm>Teams</DescriptionTerm>
        </DescriptionDivider>
        <DescriptionDivider>
          <Description>{employmentDate && employmentDate.formatString}</Description>
          <DescriptionTerm>Started</DescriptionTerm>
        </DescriptionDivider>
        {email && <DescriptionDivider>
          <Description>{email}</Description>
          <DescriptionTerm>Email</DescriptionTerm>
        </DescriptionDivider>}
        {telephoneNumber && <DescriptionDivider>
          <Description>{telephoneNumber}</Description>
          <DescriptionTerm>Telephone number</DescriptionTerm>
        </DescriptionDivider>}
      </DescriptionList>
    </GridElement>
  </Grid>
);
