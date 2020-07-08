import React from 'react';
import styled from '@emotion/styled';
import {range} from '../helpers';

const PaginationButton = styled.button`
  border: solid 1px ${props => props.theme.primaryColor};
  color: ${props => props.active ? props.theme.background : props.theme.primaryColor};
  background: ${props => props.active ? props.theme.primaryColor : props.theme.background};
  padding: 2px 7px;
  margin: 0 3px;
  border-radius: 3px;
  outline: none;
  font-size: 14px;
  cursor: pointer;
`;

const PaginationText = styled.span`
  padding: 2px;
  margin: 0 3px;
  font-size: 14px;
`;

const PaginationNav = styled.nav`
  margin-top: 10px;
`;

const isVisible = (page, currentPage, lastPage, siblings) => page === 1 ||
  page === lastPage ||
  (currentPage - siblings <= page && currentPage + siblings >= page);

const isEllipsisBefore = (page, currentPage, lastPage, siblings) => page > 1 && !isVisible(page - 1, currentPage, lastPage, siblings);

export const Pagination = ({currentPage = 1, size = 1, totalElements = 0, onSelect, siblings = 1}) => {
  const lastPage = Math.ceil(totalElements / size);
  return (
    <PaginationNav>
      {[...range(1, lastPage)]
        .filter(page => isVisible(page, currentPage, lastPage, siblings))
        .map(page => ({page, ellipsisBefore: isEllipsisBefore(page, currentPage, lastPage, siblings)}))
        .map(({page, ellipsisBefore}) => [
          ellipsisBefore && <PaginationText key={`${page}-spacer`}>&hellip;</PaginationText>,
          <PaginationButton
            type="button"
            key={page}
            active={currentPage === page}
            onClick={() => onSelect(page)}>
            {page}
          </PaginationButton>
        ])
      }
    </PaginationNav>
  );
}
