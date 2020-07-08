import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {Pagination} from '../shared/navigation/Pagination';
import {TeamHiscoresTable} from './TeamHiscoresTable';

const allHiscores = gql`
  query ($page: Int!, $size: Int!, $skill: String!) {
    allTeamHiscores(page: $page, size: $size, skill: $skill) {
      team {
        id
        name
      }
      level
      experience
    }
    teamHiscoresCount(skill: $skill)
  }
`;

export const TeamHiscoresPage = ({match: {params: {skill}}}) => {
  const pageSize = 10;
  const [page, setPage] = useState(0);
  const {data} = useQuery(allHiscores, {variables: {page, size: pageSize, skill}});
  return (
    <>
      <h1>Team hiscores for {skill}</h1>
      {data && <TeamHiscoresTable
        hiscores={data.allTeamHiscores}
        offsetRank={page * pageSize}/>}
      <Pagination
        currentPage={page + 1}
        size={pageSize}
        totalElement={data == null ? 0 : data.teamHiscoresCount}
        onSelect={selectedPage => setPage(selectedPage - 1)}/>
    </>
  );
};
