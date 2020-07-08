import React, {useState} from 'react';
import {LinkButton} from '../shared/form/Button';
import {useAuthentication} from '../authentication/useAuthentication';
import {MdAdd} from 'react-icons/md';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {TeamTable} from './TeamTable';
import {Pagination} from '../shared/navigation/Pagination';

const allTeams = gql`
  query ($page: Int!, $size: Int!) {
    allTeams(page: $page, size: $size, sort: {field: NAME, order: ASC}) {
      id
      name
      memberCount(withUnapproved: true)
      leader {
        id
        firstName
        lastName
      }
    }
    teamCount
  }
`;

export const TeamListPage = () => {
  const pageSize = 10;
  const [page, setPage] = useState(0);
  const {data} = useQuery(allTeams, {variables: {page: page, size: pageSize}});
  const {isAuthenticated} = useAuthentication();
  return (
    <>
      <h1>Teams</h1>
      {isAuthenticated && <LinkButton to="/teams/create" primary inverse>
        <MdAdd/> Create team
      </LinkButton>}
      {data && data.allTeams && <TeamTable teams={data.allTeams}/>}
      <Pagination
        currentPage={page + 1}
        size={pageSize}
        totalElements={data == null ? 0 : data.teamCount}
        onSelect={selectedPage => setPage(selectedPage - 1)}/>
    </>
  );
};
