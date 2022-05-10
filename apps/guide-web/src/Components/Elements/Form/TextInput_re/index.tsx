import React from 'react';
import { Field } from 'formik';
import ErrorMessage2 from '../ErrorMessage/new';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

interface IProps {
  label: string;
  type: string;
  name: string;
}

const TextInput2: React.FC<IProps> = ({ label, type, name, ...props }) => {
  return (
    <Field>
      {({ form: { handleChange, handleBlur, status, errors, touched, values } }) => {
        const fieldErrors = errors && errors[name] ? errors[name] : null;
        const fieldTouched = touched && touched[name] ? touched[name] : null;
        const fieldStatus = status && status[name] ? status[name] : null;

        return (
          <>
            <div>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  name={name}
                  type={type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[name]}
                  id={name}
                  autoComplete={type}
                  className={`                  
                  appearance-none 
                  block 
                  w-full 
                  px-3 
                  py-2 
                  border 
                  rounded-md shadow-sm 
                  focus:outline-none 
                  sm:text-sm

                 ${
                   (fieldErrors && fieldTouched) || (fieldStatus && fieldTouched)
                     ? `  
                 border-red-300 
                 text-red-900 
                 placeholder-red-300
                 focus:ring-red-500 
                 focus:border-red-500
                `
                     : `
                text-gray-700"
                border-gray-300 
                placeholder-gray-400
                focus:ring-green-500 
                focus:green-indigo-500
                `
                 }

                  `}
                  {...props}
                />

                {fieldErrors && fieldTouched && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                )}

                {fieldStatus && fieldTouched && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                )}
              </div>
              <ErrorMessage2 status={status} errors={errors} touched={touched} name={name} />
            </div>
          </>
        );
      }}
    </Field>
  );
};

export default TextInput2;
