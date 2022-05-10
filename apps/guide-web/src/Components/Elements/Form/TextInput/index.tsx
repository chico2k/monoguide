import React from 'react';
import { Field } from 'formik';
import { FieldWrapper, Input, Label } from './style';
import ErrorMessage from '../ErrorMessage';

interface IProps {
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
}

const TextInput: React.FC<IProps> = ({ label, type, name, placeholder, ...props }) => {
  return (
    <Field>
      {({ form: { handleChange, handleBlur, status, errors, touched, values } }) => {
        return (
          <FieldWrapper data-test="fieldWrapper">
            <Label htmlFor={name}>{label}</Label>
            <Input
              type={type}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values[name]}
              {...props}
              data-test="textInputField"
            />
            <ErrorMessage name={name} errors={errors} touched={touched} status={status} data-test="textInputError" />
          </FieldWrapper>
        );
      }}
    </Field>
  );
};

export default TextInput;
