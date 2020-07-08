import {Field} from '../shared/form/Field';
import {Input} from '../shared/form/Input';
import {Button, LinkButton} from '../shared/form/Button';
import {Form} from '../shared/form/Form';
import React, {useEffect, useState} from 'react';
import {ColumnGrid} from '../shared/layout/ColumnGrid';
import {Column} from '../shared/layout/Column';
import {LighterSpan} from '../shared/text/LighterSpan';
import {DateInput} from '../shared/form/DateInput';

function useValidSignup(email, password, password2, firstName, lastName, employmentDate, title, telephoneNumber) {
  const [isValid, setValid] = useState(false);
  useEffect(() => {
    setValid(email != null && email !== '' &&
      password != null && password !== '' &&
      password2 != null && password2 !== '' &&
      password === password2 &&
      firstName != null && firstName !== '' &&
      lastName != null && lastName !== '');
  }, [email, password, password2, firstName, lastName, employmentDate, title, telephoneNumber]);
  return [isValid];
}

export const SignupForm = ({onSignup}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState('');
  const [employmentDate, setEmploymentDate] = useState('');
  const [title, setTitle] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [isValid] = useValidSignup(email, password, password2, firstName, lastName, employmentDate, title, telephoneNumber);

  const handleSubmit = event => {
    event.preventDefault();
    if (isValid) onSignup({userInfo: {email, password}, personInfo: {firstName, lastName, employmentDate, title, telephoneNumber}});
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
          <Field>
            <label>Job title <LighterSpan>- Optional</LighterSpan></label>
            <Input
              type="text"
              placeholder="Job title"
              value={title}
              onChange={({target: {value}}) => setTitle(value)}/>
          </Field>
        </Column>
        <Column padding="10px" minWidth="300px">
          <Field>
            <label>Telephone number <LighterSpan>- Optional</LighterSpan></label>
            <Input
              type="tel"
              placeholder="Telephone number"
              value={telephoneNumber}
              onChange={({target: {value}}) => setTelephoneNumber(value)}/>
          </Field>
          <Field>
            <label>E-mail</label>
            <Input
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={({target: {value}}) => setEmail(value)}/>
          </Field>
          <Field>
            <label>Password</label>
            <Input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={({target: {value}}) => setPassword(value)}/>
          </Field>
          <Field>
            <label>Repeat password</label>
            <Input
              type="password"
              placeholder="Password"
              required
              value={password2}
              onChange={({target: {value}}) => setPassword2(value)}/>
          </Field>
        </Column>
      </ColumnGrid>
      <Field>
        <Button primary disabled={!isValid}>Sign up</Button>
      </Field>
      <Field>
        <LinkButton inverse to="/login">Back to log in</LinkButton>
      </Field>
    </Form>
  );
};
