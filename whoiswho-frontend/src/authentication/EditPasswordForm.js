import {Form} from '../shared/form/Form';
import {ColumnGrid} from '../shared/layout/ColumnGrid';
import {Column} from '../shared/layout/Column';
import {Field} from '../shared/form/Field';
import {Input} from '../shared/form/Input';
import {Button, LinkButton} from '../shared/form/Button';
import React, {useEffect, useState} from 'react';

function useValidPassword(originalPassword, newPassword, newPassword2) {
  const [isValid, setValid] = useState(false);
  useEffect(() => {
    setValid(
      originalPassword != null && originalPassword !== '' &&
      newPassword != null && newPassword !== '' &&
      newPassword2 != null && newPassword2 !== '' &&
      newPassword === newPassword2);
  }, [originalPassword, newPassword, newPassword2]);
  return [isValid];
}

export const EditPasswordForm = ({id, onEdit = () => {}}) => {
  const [originalPassword, setOriginalPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [isValid] = useValidPassword(originalPassword, newPassword, newPassword2);

  const handleSubmit = event => {
    event.preventDefault();
    if (isValid) onEdit({originalPassword, newPassword});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ColumnGrid>
        <Column padding="10px" minWidth="300px">
          <Field>
            <label>Current password</label>
            <Input
              type="password"
              placeholder="Current password"
              value={originalPassword}
              onChange={({target: {value}}) => setOriginalPassword(value)}/>
          </Field>
          <Field>
            <label>New password</label>
            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={({target: {value}}) => setNewPassword(value)}/>
          </Field>
          <Field>
            <label>Repeat new password</label>
            <Input
              type="password"
              placeholder="New password"
              value={newPassword2}
              onChange={({target: {value}}) => setNewPassword2(value)}/>
          </Field>
        </Column>
      </ColumnGrid>
      <Field>
        <Button primary disabled={!isValid}>Edit password</Button>
      </Field>
      <Field>
        <LinkButton inverse to={`/people/${id}`}>Cancel</LinkButton>
      </Field>
    </Form>
  );
};
