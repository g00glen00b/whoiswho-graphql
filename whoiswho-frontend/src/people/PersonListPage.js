import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {PersonCardGrid} from './PersonCardGrid';
import {Pagination} from '../shared/navigation/Pagination';

const allPeople = gql`
  query ($page: Int!, $size: Int!) {
    allPeople(page: $page, size: $size, sort: {field: LAST_NAME, order: ASC}) {
      id
      firstName
      lastName
      avatar
      title
      skills(size: 3, sort: {field: EXPERIENCE, order: DESC}) {
        skillName
      }
      email
      telephoneNumber
    }
    peopleCount
  }
`;

export const PersonListPage = () => {
  const pageSize = 12;
  const [page, setPage] = useState(0);
  const {data} = useQuery(allPeople, {variables: {page: page, size: pageSize}});
  return (
    <>
      <h1>People</h1>
      <PersonCardGrid people={data && data.allPeople} />
      <Pagination
        currentPage={page + 1}
        size={pageSize}
        totalElements={data == null ? 0 : data.peopleCount}
        onSelect={selectedPage => setPage(selectedPage - 1)}/>
    </>
  );
};
