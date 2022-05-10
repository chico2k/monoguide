import React from 'react';
import { Field } from 'formik';
import Select, { Props } from 'react-select';
import FieldWrapper from '../FieldWrapper/';
import { Label } from '../TextInput/style';
import ErrorMessage from '../ErrorMessage/';

interface IProps extends Props {
  options: { value: string; label: string }[];
  name: string;
  label: string;
}

const customStyles = {
  container: (provided: any) => ({
    ...provided,
  }),
};

const SelectInput: React.FC<IProps> = ({ label, name, options, ...props }) => {
  return (
    <Field name={name} id={name} type='number' data-test='selectInput'>
      {({ form: { setFieldValue, handleBlur, status, errors, touched } }) => {
        return (
          <FieldWrapper>
            <Label htmlFor={name} data-test='label'>
              {label}
            </Label>
            <Select
              inputId={name}
              styles={customStyles}
              isClearable
              onBlur={handleBlur}
              name={name}
              options={options}
              onChange={(selectedOption: { value: string; label: string }) =>
                selectedOption
                  ? setFieldValue(name, selectedOption.value)
                  : setFieldValue(name, null)
              }
              {...props}
              classNamePrefix='Select'
              data-test='selectInputField'
            />
            <ErrorMessage
              status={status}
              errors={errors}
              name={name}
              touched={touched}
              data-test='selectInputError'
            />
          </FieldWrapper>
        );
      }}
    </Field>
  );
};

export default SelectInput;
