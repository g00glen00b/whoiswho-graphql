import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {Pagination} from '../shared/navigation/Pagination';
import {StudyMaterialTable} from './StudyMaterialTable';
import {LinkButton} from '../shared/form/Button';
import {MdAdd} from 'react-icons/md';
import {useAuthentication} from '../authentication/useAuthentication';

const allStudyMaterial = gql`
  query ($page: Int!, $size: Int!) {
    allStudyMaterial(page: $page, size: $size, withUnapproved: true, sort: {field: NAME, order: ASC}) {
      id
      name
      skills
      averageRating
      complexity {
        description
      }
      type {
        description
      }
      duration {
        toHours
      }
      completed
      completedCount
      approved
    }
    studyMaterialCount(withUnapproved: true)
  }
`;

export const StudyMaterialListPage = () => {
  const pageSize = 10;
  const [page, setPage] = useState(0);
  const {data} = useQuery(allStudyMaterial, {variables: {page: page, size: pageSize}});
  const {isAuthenticated} = useAuthentication();
  return (
    <>
      <h1>Study material</h1>
      {isAuthenticated && <LinkButton to="/material/create" primary inverse>
        <MdAdd/> Create new study material
      </LinkButton>}
      <StudyMaterialTable studyMaterials={data && data.allStudyMaterial}/>
      <Pagination
        currentPage={page + 1}
        size={pageSize}
        totalElements={data == null ? 0 : data.studyMaterialCount}
        onSelect={selectedPage => setPage(selectedPage - 1)}/>
    </>
  );
};
