import {ColumnGrid} from '../shared/layout/ColumnGrid';
import {Column} from '../shared/layout/Column';
import {Field} from '../shared/form/Field';
import {Button, LinkButton} from '../shared/form/Button';
import {Form} from '../shared/form/Form';
import React, {useState, useEffect} from 'react';
import {Textarea} from '../shared/form/Textarea';
import {DateInput} from '../shared/form/DateInput';
import {InputRating} from '../shared/form/InputRating';

function useValidReview(rating, completionDate, review) {
  const [isValid, setValid] = useState(false);
  useEffect(() => {
    setValid(rating != null && rating >= 1 && rating <= 5 &&
      completionDate != null && completionDate <= new Date() &&
      review != null && review !== '');
  }, [rating, completionDate, review]);
  return [isValid];
}

export const CreateStudyMaterialReviewForm = ({onCreate, id}) => {
  const [rating, setRating] = useState(1);
  const [completionDate, setCompletionDate] = useState(new Date());
  const [review, setReview] = useState('');
  const [isValid] = useValidReview(rating, completionDate, review);
  const today = new Date();

  const handleSubmit = event => {
    event.preventDefault();
    if (isValid) onCreate({completionDate, review, rating});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ColumnGrid>
        <Column padding="10px" minWidth="400px">
          <Field>
            <label>Rating</label>
            <InputRating
              type="number"
              value={rating}
              onChange={newRating => setRating(newRating)}/>
          </Field>
          <Field>
            <label>Completed on</label>
            <DateInput
              type="date"
              selected={completionDate}
              maxDate={today}
              onChange={date => setCompletionDate(date)}/>
          </Field>
          <Field>
            <label>Review</label>
            <Textarea
              rows="3"
              placeholder="Review"
              value={review}
              onChange={event => setReview(event.target.value)}/>
          </Field>
        </Column>
      </ColumnGrid>
      <Field>
        <Button primary disabled={!isValid}>Create</Button>
      </Field>
      <Field>
        <LinkButton inverse to={`/material/${id}`}>Go back</LinkButton>
      </Field>
    </Form>
  );
}
