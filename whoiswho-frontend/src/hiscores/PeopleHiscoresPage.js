import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {PeopleHiscoresTable} from './PeopleHiscoresTable';
import {Pagination} from '../shared/navigation/Pagination';
import gql from 'graphql-tag';

const allHiscores = gql`
  query ($page: Int!, $size: Int!, $skill: String!) {
    allPersonHiscores(page: $page, size: $size, skill: $skill) {
      person {
        id
        firstName
        lastName
      }
      level
      experience
    }
    personHiscoresCount(skill: $skill)
  }
`;

export const PeopleHiscoresPage = ({match: {params: {skill}}}) => {
  const pageSize = 10;
  const [page, setPage] = useState(0);
  const {data} = useQuery(allHiscores, {variables: {page, size: pageSize, skill}});
  return (
    <>
      <h1>Employee hiscores for {skill}</h1>
      {data && <PeopleHiscoresTable
        hiscores={data.allPersonHiscores}
        offsetRank={page * pageSize}/>}
      <Pagination
        currentPage={page + 1}
        size={pageSize}
        totalElement={data == null ? 0 : data.personHiscoresCount}
        onSelect={selectedPage => setPage(selectedPage - 1)}/>
    </>
  );
};
