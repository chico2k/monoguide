import React from 'react';
import { Field } from 'formik';
import ErrorMessage from '../ErrorMessage';
import { TextArea } from './style';
import { FieldWrapper } from '../TextInput/style';
import { Label } from '../Label/style';

interface IProps {
  label: string;
  name: string;
  placeholder: string;
}

const TextAreaInput: React.FC<IProps> = ({
  label,
  name,
  placeholder,
  ...props
}) => {
  return (
    <Field>
      {({
        form: { handleChange, handleBlur, status, errors, touched, values },
      }) => {
        return (
          <FieldWrapper data-test='fieldWrapper'>
            <Label htmlFor={name}>{label}</Label>
            <TextArea
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values[name]}
              {...props}
              data-test='textInputAreaField'
            />
            <ErrorMessage
              name={name}
              errors={errors}
              touched={touched}
              status={status}
              data-test='textInputAreaError'
            />
          </FieldWrapper>
        );
      }}
    </Field>
  );
};

export default TextAreaInput;
