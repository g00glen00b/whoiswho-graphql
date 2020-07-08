import React, {useEffect, useState} from 'react';
import {CenteredBox} from '../shared/layout/CenteredBox';
import {Card} from '../shared/Card';
import {Button} from '../shared/form/Button';
import {Column} from '../shared/layout/Column';
import {Field} from '../shared/form/Field';
import {Form} from '../shared/form/Form';
import {Select} from '../shared/form/Select';
import {getSkillOptions, getSkillValue} from '../skills/helpers';
import useDebounce from '../shared/useDebounce';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {RadioButtonList} from '../shared/form/RadioButtonList';
import {Redirect} from 'react-router';

const allSkillsQuery = gql`
  query ($search: String) {
    allSkills(search: $search, page: 0, size: 10)
  }
`;

function useValidHiscore(type, skill) {
  const [isValid, setValid] = useState(false);
  useEffect(() => {
    setValid(type != null && skill != null);
  }, [type, skill]);
  return [isValid];
}

export const HiscoreTypeChooserPage = () => {
  const types = [{path: 'people', name: 'People'}, {path: 'teams', name: 'Teams'}];
  const [isRedirect, setRedirect] = useState(false);
  const [type, setType] = useState('people');
  const [skill, setSkill] = useState(null);
  const [isValid] = useValidHiscore(type, skill);
  const [currentSkill, setCurrentSkill] = useState('');
  const [debouncedCurrentSkill, loadingDebounce] = useDebounce(currentSkill, 500);
  const {data, loading} = useQuery(allSkillsQuery, {variables: {search: debouncedCurrentSkill}});

  function handleSubmit(event) {
    event.preventDefault();
    setRedirect(true);
  }

  return (
    <CenteredBox>
      {isRedirect && <Redirect to={`/hiscores/${type}/${skill}`}/>}
      <h1>What are you looking for?</h1>
      <Card flex>
        <Column minWidth="400px">
          <Form onSubmit={handleSubmit}>
            <Field>
              <label>I'm looking for the best ...</label>
              <RadioButtonList
                code={type}
                name="type"
                options={types}
                keyFn={type => type.path}
                descriptionFn={type => type.name}
                onSelect={type => setType(type)}/>
            </Field>
            <Field>
              <label>In ...</label>
              <Select
                name="skill"
                isLoading={loading || loadingDebounce}
                options={getSkillOptions(data)}
                onInputChange={currentSkill => setCurrentSkill(currentSkill)}
                onChange={skill => setSkill(getSkillValue(skill))}
                placeholder="Skill"/>
            </Field>
            <Field>
              <Button primary disabled={!isValid}>
                Open hiscores
              </Button>
            </Field>
          </Form>
        </Column>
      </Card>
    </CenteredBox>
  );
}
