import {Form} from '../shared/form/Form';
import {ColumnGrid} from '../shared/layout/ColumnGrid';
import {Column} from '../shared/layout/Column';
import {Field} from '../shared/form/Field';
import {Input} from '../shared/form/Input';
import {Button, LinkButton} from '../shared/form/Button';
import React, {useEffect, useState} from 'react';
import {PersonAvatar} from '../people/PersonAvatar';
import styled from '@emotion/styled';

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function useValidAvatar(avatar) {
  const [isValid, setValid] = useState(false);
  useEffect(() => setValid(avatar != null), [avatar]);
  return [isValid];
}

function useAvatarBlob(file) {
  const [tempAvatar, setTempAvatar] = useState(null);
  useEffect(() => {
    if (file != null) {
      const fileReader = new FileReader();
      fileReader.onerror = err => console.log('Error', err);
      fileReader.onload = ({target: {result} = {}}) => setTempAvatar(result);
      setTempAvatar(fileReader.readAsDataURL(file));
    }
  }, [file]);
  return [tempAvatar];
}

export const EditAvatarForm = ({id, firstName, avatarUrl, onEdit}) => {
  const [avatar, setAvatar] = useState(null);
  const [tempAvatar] = useAvatarBlob(avatar);
  const [isValid] = useValidAvatar(avatar);

  const handleSubmit = event => {
    event.preventDefault();
    onEdit({avatar});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ColumnGrid>
        <Column padding="10px" minWidth="300px">
          <AvatarContainer>
            <PersonAvatar
              firstName={firstName}
              avatar={tempAvatar != null ? tempAvatar : avatarUrl}
              width="200px"/>
          </AvatarContainer>
          <Field>
            <label>Avatar</label>
            <Input
              type="file"
              placeholder="Choose a file"
              onChange={({target: {files: [file]}}) => setAvatar(file)}/>
          </Field>
        </Column>
      </ColumnGrid>
      <Field>
        <Button primary disabled={!isValid}>Edit avatar</Button>
      </Field>
      <Field>
        <LinkButton inverse to={`/people/${id}`}>Cancel</LinkButton>
      </Field>
    </Form>
  );
};
