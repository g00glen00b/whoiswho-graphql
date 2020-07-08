import React from 'react';
import styled from '@emotion/styled';

const SkillScoreBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1fr, 2);
  grid-template-rows: repeat(1fr, 2); 
  margin-bottom: 10px;
`;

const SkillScoreLevel = styled.span`
  text-align: right;
  grid-column-start: 2;
`;

const ProgressBackground = styled.span`
  height: 15px;
  width: 100%;
  position: relative;
  background-color: ${props => props.theme.backgroundColorDarker};
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
`;

const ProgressLevel = styled.span`
  position: absolute;
  height: 100%;
  background-color: ${props => props.theme.primaryColor};
  width: ${props => props.progress * 100}%;
`;

export const SkillScore = ({skill, level, progress}) => {
  return (
    <SkillScoreBox>
      <label>{skill}</label>
      <SkillScoreLevel>Level {level}</SkillScoreLevel>
      <ProgressBackground>
        <ProgressLevel progress={progress}/>
      </ProgressBackground>
    </SkillScoreBox>
  );
};
