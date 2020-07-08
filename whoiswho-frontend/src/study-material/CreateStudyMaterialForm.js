import {Form} from '../shared/form/Form';
import {ColumnGrid} from '../shared/layout/ColumnGrid';
import {Column} from '../shared/layout/Column';
import {Field} from '../shared/form/Field';
import {Input} from '../shared/form/Input';
import {Button, LinkButton} from '../shared/form/Button';
import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {RadioButtonList} from '../shared/form/RadioButtonList';
import gql from 'graphql-tag';
import useDebounce from '../shared/useDebounce';
import {LighterSpan} from '../shared/text/LighterSpan';
import {CreatableSelect} from '../shared/form/CreatableSelect';
import {getSkillOptions, getSkillValues} from '../skills/helpers';

const allInfoQuery = gql`
  query ($search: String) {
    allStudyMaterialTypes {
      code
      description
    }
    allStudyMaterialComplexities {
      code
      description
    }
    allSkills(search: $search, page: 0, size: 10)
  }
`;

function useValidStudyMaterial(name, type, skills, complexity, durationHours) {
  const [isValid, setValid] = useState(false);
  useEffect(() => {
    setValid(name != null && name !== '' &&
      type != null &&
      skills != null && skills.length > 0 &&
      complexity != null &&
      durationHours != null && durationHours > 0);
  }, [name, type, skills, complexity, durationHours]);
  return [isValid];
}

export const CreateStudyMaterialForm = ({onCreate}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('BOOK');
  const [skills, setSkills] = useState([]);
  const [complexity, setComplexity] = useState('BEGINNER');
  const [durationHours, setDurationHours] = useState(1);
  const [currentSkill, setCurrentSkill] = useState('');
  const [debouncedCurrentSkill, loadingDebounce] = useDebounce(currentSkill, 500);
  const [isValid] = useValidStudyMaterial(name, type, skills, complexity, durationHours);
  const {data, loading} = useQuery(allInfoQuery, {variables: {search: debouncedCurrentSkill}});


  const handleSubmit = event => {
    event.preventDefault();
    if (isValid) onCreate({name, type, skills, complexity, durationHours});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ColumnGrid>
        <Column padding="10px" minWidth="400px">
          <Field>
            <label>Name</label>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              required
              onChange={({target: {value}}) => setName(value)}/>
          </Field>
          <Field>
            <label>Type</label>
            {data && <RadioButtonList
              options={data.allStudyMaterialTypes}
              code={type}
              onSelect={newType => setType(newType)}/>}
          </Field>
          <Field>
            <label>Complexity</label>
            {data && <RadioButtonList
              options={data.allStudyMaterialComplexities}
              code={complexity}
              onSelect={newComplexity => setComplexity(newComplexity)}/>}
          </Field>
          <Field>
            <label>Skills</label>
            <CreatableSelect
              name="skills"
              isMulti
              isLoading={loading || loadingDebounce}
              options={getSkillOptions(data)}
              onInputChange={currentSkill => setCurrentSkill(currentSkill)}
              onChange={skills => setSkills(getSkillValues(skills))}
              placeholder="Skills"/>
          </Field>
          <Field>
            <label>Duration <LighterSpan>- In hours</LighterSpan></label>
            <Input
              type="number"
              min="1"
              required
              step="1"
              value={durationHours}
              onChange={({target: {value}}) => setDurationHours(parseInt(value))}/>
          </Field>
        </Column>
      </ColumnGrid>
      <Field>
        <Button primary disabled={!isValid}>Create</Button>
      </Field>
      <Field>
        <LinkButton inverse to="/material">Go back</LinkButton>
      </Field>
    </Form>
  );
};
