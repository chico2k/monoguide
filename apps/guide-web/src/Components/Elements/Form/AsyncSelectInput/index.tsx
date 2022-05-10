import React from 'react';
import { Field } from 'formik';
import AsyncSelect from 'react-select/async';
import { Props } from 'react-select';
import Label from '../Label';
import ErrorMessage from '../ErrorMessage';
import { FieldWrapper } from '../TextInput/style';

interface IProps extends Props {
  onChange?: any;
  name: string;
  label: string;
  loadOptions: any;
}

const customStyles = {
  container: (provided: any) => ({
    ...provided,
  }),
};

const index: React.FC<IProps> = ({ name, label, loadOptions, ...props }) => {
  return (
    <Field name={name} id={name} type='number' data-test='field'>
      {({ form: { setFieldValue, handleBlur, status, errors, touched } }) => {
        return (
          <FieldWrapper>
            <Label htmlFor={name}>{label}</Label>
            <AsyncSelect
              styles={customStyles}
              inputId={name}
              defaultOptions
              loadOptions={loadOptions}
              isClearable
              onBlur={handleBlur}
              onChange={(selectedOption: { value: string; label: string }) =>
                selectedOption
                  ? setFieldValue(name, selectedOption.value)
                  : setFieldValue(name, null)
              }
              {...props}
            />
            <ErrorMessage
              status={status}
              errors={errors}
              name={name}
              touched={touched}
            />
          </FieldWrapper>
        );
      }}
    </Field>
  );
};

export default index;
