import {withTheme} from 'emotion-theming';
import React from 'react';
import {css, Global} from '@emotion/core';

export const GlobalStyles = withTheme(({theme}) => (
  <Global styles={css`
    @import url('https://fonts.googleapis.com/css?family=Poppins:300,400,600,700&display=swap');

    * {
      font-family: 'Poppins', sans-serif;
      box-sizing: border-box;
      color: ${theme.textColor};
    }
    
    svg, svg * {
      color: inherit;
    }
    
    html, body {
      margin: 0;
      padding: 0;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-weight: 500;
    }
    
    a, a * {
      color: ${theme.primaryColor};
    }
    
    .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle, .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle, .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__month-read-view--down-arrow,
    .react-datepicker__month-year-read-view--down-arrow {
      margin-left: -8px;
      position: absolute;
    }
    
    .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle, .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle, .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__month-read-view--down-arrow,
    .react-datepicker__month-year-read-view--down-arrow, .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::before, .react-datepicker__year-read-view--down-arrow::before,
    .react-datepicker__month-read-view--down-arrow::before,
    .react-datepicker__month-year-read-view--down-arrow::before {
      box-sizing: content-box;
      position: absolute;
      border: 8px solid transparent;
      height: 0;
      width: 1px;
    }
    
    .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::before, .react-datepicker__year-read-view--down-arrow::before,
    .react-datepicker__month-read-view--down-arrow::before,
    .react-datepicker__month-year-read-view--down-arrow::before {
      content: "";
      z-index: -1;
      border-width: 8px;
      left: -8px;
      border-bottom-color: ${theme.backgroundColorDarker};
    }
    
    .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
      top: 0;
      margin-top: -8px;
    }
    
    .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle, .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before {
      border-top: none;
      border-bottom-color: ${theme.backgroundColorDarker};
    }
    
    .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before {
      top: -1px;
      border-bottom-color: ${theme.backgroundColorDarker};
    }
    
    .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle, .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__month-read-view--down-arrow,
    .react-datepicker__month-year-read-view--down-arrow {
      bottom: 0;
      margin-bottom: -8px;
    }
    
    .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle, .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__month-read-view--down-arrow,
    .react-datepicker__month-year-read-view--down-arrow, .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::before, .react-datepicker__year-read-view--down-arrow::before,
    .react-datepicker__month-read-view--down-arrow::before,
    .react-datepicker__month-year-read-view--down-arrow::before {
      border-bottom: none;
      border-top-color: ${theme.backgroundColorDarker};
    }
    
    .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::before, .react-datepicker__year-read-view--down-arrow::before,
    .react-datepicker__month-read-view--down-arrow::before,
    .react-datepicker__month-year-read-view--down-arrow::before {
      bottom: -1px;
      border-top-color: ${theme.backgroundColorDarker};
    }
    
    .react-datepicker-wrapper {
      display: inline-block;
      padding: 0;
      border: 0;
    }
    
    .react-datepicker {
      font-size: 0.8rem;
      background-color: ${theme.background};
      color: ${theme.textColor};
      border: 1px solid ${theme.backgroundColorDarker};
      display: inline-block;
      position: relative;
    }
    
    .react-datepicker--time-only .react-datepicker__triangle {
      left: 35px;
    }
    
    .react-datepicker--time-only .react-datepicker__time-container {
      border-left: 0;
    }
    
    .react-datepicker__triangle {
      position: absolute;
      left: 50px;
    }
    
    .react-datepicker-popper {
      z-index: 1;
    }
    
    .react-datepicker-popper[data-placement^="bottom"] {
      margin-top: 10px;
    }
    
    .react-datepicker-popper[data-placement^="top"] {
      margin-bottom: 10px;
    }
    
    .react-datepicker-popper[data-placement^="right"] {
      margin-left: 8px;
    }
    
    .react-datepicker-popper[data-placement^="right"] .react-datepicker__triangle {
      left: auto;
      right: 42px;
    }
    
    .react-datepicker-popper[data-placement^="left"] {
      margin-right: 8px;
    }
    
    .react-datepicker-popper[data-placement^="left"] .react-datepicker__triangle {
      left: 42px;
      right: auto;
    }
    
    .react-datepicker__header {
      text-align: center;
      background-color: ${theme.backgroundColorDarker};
      border-bottom: 1px solid ${theme.backgroundColorDarker};
      padding-top: 8px;
      position: relative;
    }
    
    .react-datepicker__year-dropdown-container--select,
    .react-datepicker__month-dropdown-container--select,
    .react-datepicker__month-year-dropdown-container--select,
    .react-datepicker__year-dropdown-container--scroll,
    .react-datepicker__month-dropdown-container--scroll,
    .react-datepicker__month-year-dropdown-container--scroll {
      display: inline-block;
      margin: 0 2px;
    }
    
    .react-datepicker__current-month,
    .react-datepicker-time__header,
    .react-datepicker-year-header {
      margin-top: 0;
      color: ${theme.textColor};
      font-weight: 500;
      font-size: 0.944rem;
    }
    
    .react-datepicker-time__header {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    
    .react-datepicker__navigation {
      background: none;
      line-height: 1.7rem;
      text-align: center;
      cursor: pointer;
      position: absolute;
      top: 10px;
      padding: 0;
      border: 0.45rem solid transparent;
      z-index: 1;
      height: 10px;
      width: 10px;
      text-indent: -999em;
      overflow: hidden;
    }
    
    .react-datepicker__navigation--previous {
      left: 10px;
      border-right-color: ${theme.textColorLighter};
    }
    
    .react-datepicker__navigation--previous:hover {
      border-right-color: ${theme.textColorLighter};
    }
    
    .react-datepicker__navigation--previous--disabled, .react-datepicker__navigation--previous--disabled:hover {
      border-right-color: ${theme.backgroundColorDarker};
      cursor: default;
    }
    
    .react-datepicker__navigation--next {
      right: 10px;
      border-left-color: ${theme.textColorLighter};
    }
    
    .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
      right: 80px;
    }
    
    .react-datepicker__navigation--next:hover {
      border-left-color: ${theme.textColorLighter};
    }
    
    .react-datepicker__navigation--next--disabled, .react-datepicker__navigation--next--disabled:hover {
      border-left-color: ${theme.backgroundColorDarker};
      cursor: default;
    }
    
    .react-datepicker__navigation--years {
      position: relative;
      top: 0;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    
    .react-datepicker__navigation--years-previous {
      top: 4px;
      border-top-color: ${theme.textColorLighter};
    }
    
    .react-datepicker__navigation--years-previous:hover {
      border-top-color: ${theme.textColorLighter};
    }
    
    .react-datepicker__navigation--years-upcoming {
      top: -4px;
      border-bottom-color: ${theme.textColorLighter};
    }
    
    .react-datepicker__navigation--years-upcoming:hover {
      border-bottom-color: ${theme.textColorLighter};
    }
    
    .react-datepicker__month-container {
      float: left;
    }
    
    .react-datepicker__month {
      margin: 0.4rem;
      text-align: center;
    }
    
    .react-datepicker__month .react-datepicker__month-text,
    .react-datepicker__month .react-datepicker__quarter-text {
      display: inline-block;
      width: 4rem;
      margin: 2px;
    }
    
    .react-datepicker__day-names,
    .react-datepicker__week {
      white-space: nowrap;
    }
    
    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
      color: ${theme.textColor};
      display: inline-block;
      width: 1.7rem;
      line-height: 1.7rem;
      text-align: center;
      margin: 0.166rem;
    }
    
    .react-datepicker__month--selected, .react-datepicker__month--in-selecting-range, .react-datepicker__month--in-range,
    .react-datepicker__quarter--selected,
    .react-datepicker__quarter--in-selecting-range,
    .react-datepicker__quarter--in-range {
      background-color: ${theme.primaryColor};
      color: ${theme.background};
    }
    
    .react-datepicker__month--selected:hover, .react-datepicker__month--in-selecting-range:hover, .react-datepicker__month--in-range:hover,
    .react-datepicker__quarter--selected:hover,
    .react-datepicker__quarter--in-selecting-range:hover,
    .react-datepicker__quarter--in-range:hover {
      background-color: ${theme.primaryColor};
    }
    
    .react-datepicker__month--disabled,
    .react-datepicker__quarter--disabled {
      color: ${theme.textColorLighter};
      pointer-events: none;
    }
    
    .react-datepicker__month--disabled:hover,
    .react-datepicker__quarter--disabled:hover {
      cursor: default;
      background-color: transparent;
    }
    
    .react-datepicker__day,
    .react-datepicker__month-text,
    .react-datepicker__quarter-text {
      cursor: pointer;
    }
    
    .react-datepicker__day:hover,
    .react-datepicker__month-text:hover,
    .react-datepicker__quarter-text:hover {
      background-color: ${theme.primaryColorLight};
    }
    
    .react-datepicker__day--today,
    .react-datepicker__month-text--today,
    .react-datepicker__quarter-text--today {
      font-weight: 500;
    }
    
    .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range,
    .react-datepicker__month-text--selected,
    .react-datepicker__month-text--in-selecting-range,
    .react-datepicker__month-text--in-range,
    .react-datepicker__quarter-text--selected,
    .react-datepicker__quarter-text--in-selecting-range,
    .react-datepicker__quarter-text--in-range {
      background-color: ${theme.primaryColor};
      color: ${theme.background};
    }
    
    .react-datepicker__day--selected:hover, .react-datepicker__day--in-selecting-range:hover, .react-datepicker__day--in-range:hover,
    .react-datepicker__month-text--selected:hover,
    .react-datepicker__month-text--in-selecting-range:hover,
    .react-datepicker__month-text--in-range:hover,
    .react-datepicker__quarter-text--selected:hover,
    .react-datepicker__quarter-text--in-selecting-range:hover,
    .react-datepicker__quarter-text--in-range:hover {
      background-color: ${theme.primaryColor};
    }
    
    .react-datepicker__month--selecting-range .react-datepicker__day--in-range , .react-datepicker__month--selecting-range
    .react-datepicker__month-text--in-range , .react-datepicker__month--selecting-range
    .react-datepicker__quarter-text--in-range {
      background-color: ${theme.backgroundColorDarker};
      color: ${theme.textColor};
    }
    
    .react-datepicker__day--disabled,
    .react-datepicker__month-text--disabled,
    .react-datepicker__quarter-text--disabled {
      cursor: default;
      color: ${theme.textColorLighter};
    }
    
    .react-datepicker__day--disabled:hover,
    .react-datepicker__month-text--disabled:hover,
    .react-datepicker__quarter-text--disabled:hover {
      background-color: transparent;
    }
    
    .react-datepicker__input-container {
      position: relative;
      display: inline-block;
      width: 100%;
    }
    
    .react-datepicker__year-read-view,
    .react-datepicker__month-read-view,
    .react-datepicker__month-year-read-view {
      border: 1px solid transparent;
    }
    
    .react-datepicker__year-read-view:hover,
    .react-datepicker__month-read-view:hover,
    .react-datepicker__month-year-read-view:hover {
      cursor: pointer;
    }
    
    .react-datepicker__year-read-view:hover .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__year-read-view:hover .react-datepicker__month-read-view--down-arrow,
    .react-datepicker__month-read-view:hover .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__month-read-view:hover .react-datepicker__month-read-view--down-arrow,
    .react-datepicker__month-year-read-view:hover .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__month-year-read-view:hover .react-datepicker__month-read-view--down-arrow {
      border-top-color: ${theme.backgroundColorDarker};
    }
    
    .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__month-read-view--down-arrow,
    .react-datepicker__month-year-read-view--down-arrow {
      border-top-color: ${theme.backgroundColorDarker};
      float: right;
      margin-left: 20px;
      top: 8px;
      position: relative;
      border-width: 0.45rem;
    }
    
    .react-datepicker__year-dropdown,
    .react-datepicker__month-dropdown,
    .react-datepicker__month-year-dropdown {
      background-color: ${theme.backgroundColorDarker};
      position: absolute;
      width: 50%;
      left: 25%;
      top: 30px;
      z-index: 1;
      text-align: center;
      border: 1px solid ${theme.backgroundColorDarker};
    }
    
    .react-datepicker__year-dropdown:hover,
    .react-datepicker__month-dropdown:hover,
    .react-datepicker__month-year-dropdown:hover {
      cursor: pointer;
    }
    
    .react-datepicker__year-dropdown--scrollable,
    .react-datepicker__month-dropdown--scrollable,
    .react-datepicker__month-year-dropdown--scrollable {
      height: 150px;
      overflow-y: scroll;
    }
    
    .react-datepicker__year-option,
    .react-datepicker__month-option,
    .react-datepicker__month-year-option {
      line-height: 20px;
      width: 100%;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    
    .react-datepicker__year-option:first-of-type,
    .react-datepicker__month-option:first-of-type,
    .react-datepicker__month-year-option:first-of-type {
      border-top-left-radius: 0.3rem;
      border-top-right-radius: 0.3rem;
    }
    
    .react-datepicker__year-option:last-of-type,
    .react-datepicker__month-option:last-of-type,
   .react-datepicker__month-year-option:last-of-type {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border-bottom-left-radius: 0.3rem;
      border-bottom-right-radius: 0.3rem;
    }
    
    .react-datepicker__year-option:hover,
    .react-datepicker__month-option:hover,
    .react-datepicker__month-year-option:hover {
      background-color: ${theme.primaryColorLight};
    }
    
    .react-datepicker__year-option:hover .react-datepicker__navigation--years-upcoming,
    .react-datepicker__month-option:hover .react-datepicker__navigation--years-upcoming,
    .react-datepicker__month-year-option:hover .react-datepicker__navigation--years-upcoming {
      border-bottom-color: ${theme.textColorLighter};
    }
    
    .react-datepicker__year-option:hover .react-datepicker__navigation--years-previous,
    .react-datepicker__month-option:hover .react-datepicker__navigation--years-previous,
    .react-datepicker__month-year-option:hover .react-datepicker__navigation--years-previous {
      border-top-color: ${theme.textColorLighter};
    }
    
    .react-datepicker__year-option--selected,
    .react-datepicker__month-option--selected,
    .react-datepicker__month-year-option--selected {
      position: absolute;
      left: 15px;
    }

  `}/>
));
