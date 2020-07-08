import {ColumnGrid} from '../shared/layout/ColumnGrid';
import {Column} from '../shared/layout/Column';
import {Field} from '../shared/form/Field';
import {Input} from '../shared/form/Input';
import {LighterSpan} from '../shared/text/LighterSpan';
import {DateInput} from '../shared/form/DateInput';
import {Button, LinkButton} from '../shared/form/Button';
import {Form} from '../shared/form/Form';
import React, {useState, useEffect} from 'react';

function useValidProfile(password, password2, firstName, lastName, employmentDate, title, telephoneNumber) {
  const [isValid, setValid] = useState(false);
  useEffect(() => {
    setValid(firstName != null && firstName !== '' &&
      lastName != null && lastName !== '');
  }, [password, password2, firstName, lastName, employmentDate, title, telephoneNumber]);
  return [isValid];
}

export const EditProfileForm = ({id, profile = {}, onEdit}) => {
  const [firstName, setFirstName] = useState(profile.firstName || '');
  const [lastName, setLastname] = useState(profile.lastName || '');
  const [employmentDate, setEmploymentDate] = useState(new Date(profile.employmentDate.iso));
  const [title, setTitle] = useState(profile.title || '');
  const [telephoneNumber, setTelephoneNumber] = useState(profile.telephoneNumber || '');
  const [isValid] = useValidProfile(firstName, lastName, employmentDate, title, telephoneNumber);

  const handleSubmit = event => {
    event.preventDefault();
    onEdit({firstName, lastName, employmentDate, title, telephoneNumber});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ColumnGrid>
        <Column padding="10px" minWidth="300px">
          <Field>
            <label>First name</label>
            <Input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={({target: {value}}) => setFirstName(value)}/>
          </Field>
          <Field>
            <label>Last name</label>
            <Input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={({target: {value}}) => setLastname(value)}/>
          </Field>
          <Field>
            <label>Employment date <LighterSpan>- Optional</LighterSpan></label>
            <DateInput
              placeholder="Employment date"
              selected={employmentDate}
              showYearDropdown
              yearDropdownItemNumber={10}
              scrollableYearDropdown
              showMonthDropdown
              onChange={date => setEmploymentDate(date)}/>
          </Field>
        </Column>
        <Column padding="10px" minWidth="300px">
          <Field>
            <label>Job title <LighterSpan>- Optional</LighterSpan></label>
            <Input
              type="text"
              placeholder="Job title"
              value={title}
              onChange={({target: {value}}) => setTitle(value)}/>
          </Field>
          <Field>
            <label>Telephone number <LighterSpan>- Optional</LighterSpan></label>
            <Input
              type="tel"
              placeholder="Telephone number"
              value={telephoneNumber}
              onChange={({target: {value}}) => setTelephoneNumber(value)}/>
          </Field>
        </Column>
      </ColumnGrid>
      <Field>
        <Button primary disabled={!isValid}>Edit profile</Button>
      </Field>
      <Field>
        <LinkButton inverse to={`/people/${id}`}>Cancel</LinkButton>
      </Field>
    </Form>
  );
};
