import {Field} from '../shared/form/Field';
import {Input} from '../shared/form/Input';
import {Button, LinkButton} from '../shared/form/Button';
import {Form} from '../shared/form/Form';
import React, {useState, useEffect} from 'react';
import {Column} from '../shared/layout/Column';

function useValidLogin(email, password) {
  const [isValid, setValid] = useState(false);
  useEffect(() => {
    setValid(email !== '' && email != null && password !== '' && password != null);
  }, [email, password]);
  return [isValid];
}

export const LoginForm = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid] = useValidLogin(email, password);

  const handleSubmit = event => {
    event.preventDefault();
    if (isValid) onLogin({email, password});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Column minWidth="300px">
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
          <Button primary disabled={!isValid}>Log in</Button>
        </Field>
        <Field>
          <LinkButton inverse to="/signup">Create an account</LinkButton>
        </Field>
      </Column>
    </Form>
  );
};
