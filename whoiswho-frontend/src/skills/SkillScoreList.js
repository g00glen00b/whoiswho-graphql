import {SkillScore} from './SkillScore';
import React from 'react';
import {EvenGrid} from '../shared/layout/EvenGrid';
import {LighterSpan} from '../shared/text/LighterSpan';

export const SkillScoreList = ({skills, title = 'Levels'}) => (
  <div>
    <h2>{title}</h2>
    <EvenGrid minWidth="360px">
      {skills && skills.map(({skillName, level, progress}) => (
        <SkillScore
          key={skillName}
          skill={skillName}
          level={level}
          progress={progress}/>
      ))}
      {skills && skills.length === 0 && <p><LighterSpan>None yet.</LighterSpan></p>}
    </EvenGrid>
  </div>
);
