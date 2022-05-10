import React from 'react';
import { Field } from 'formik';
import Rating from 'react-rating';
import { Label } from '../Label/style';
import { FieldWrapper } from '../TextInput/style';

interface IProps {
  name: string;
}

const ReviewInput: React.FC<IProps> = ({ name }) => {
  const [rate, setRate] = React.useState(0);
  return (
    <Field name={name} id={name} type='number' data-test='field'>
      {({ form: { setFieldValue } }) => {
        return (
          <FieldWrapper>
            <Label htmlFor={name} data-test='label'>
              Rating
            </Label>
            <Rating
              start={0}
              stop={5}
              fractions={1}
              initialRating={rate}
              onChange={(v: number) => {
                setFieldValue(name, v);
                setRate(v);
              }}
              onClick={(v: number) => {
                setFieldValue(name, v);
                setRate(v);
              }}
            />
          </FieldWrapper>
        );
      }}
    </Field>
  );
};

export default ReviewInput;
