import {ColumnGrid} from '../shared/layout/ColumnGrid';
import {Column} from '../shared/layout/Column';
import {Field} from '../shared/form/Field';
import {Input} from '../shared/form/Input';
import {Button, LinkButton} from '../shared/form/Button';
import {Form} from '../shared/form/Form';
import React, {useState, useEffect} from 'react';

function useValidTeam(name) {
  const [isValid, setValid] = useState(false);
  useEffect(() => {
    setValid(name != null && name !== '');
  }, [name]);
  return [isValid];
}

export const CreateTeamForm = ({onCreate}) => {
  const [name, setName] = useState('');
  const [isValid] = useValidTeam(name);

  const handleSubmit = event => {
    event.preventDefault();
    if (isValid) onCreate({name});
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
        </Column>
      </ColumnGrid>
      <Field>
        <Button primary disabled={!isValid}>Create</Button>
      </Field>
      <Field>
        <LinkButton inverse to="/teams">Go back</LinkButton>
      </Field>
    </Form>
  );
}
