import React from 'react';

type IProps = {
  errors?: {
    [key: string]: any;
  };
  touched?: {
    [key: string]: any;
  };
  status?: {
    [key: string]: any;
  };
  name: string;
};

const ErrorMessage2: React.FC<IProps> = ({ errors, touched, name, status }) => {
  const fieldErrors = errors && errors[name] ? errors[name] : null;
  const fieldTouched = touched && touched[name] ? touched[name] : null;

  const fieldStatus = status && status[name] ? status[name] : null;

  if (fieldErrors && fieldTouched)
    return (
      <p className="mt-2 text-sm text-red-600" id="email-error">
        {fieldErrors}
      </p>
    );

  if (fieldStatus && touched) {
    return (
      <p className="mt-2 text-sm text-red-600" id="email-error">
        {fieldStatus}
      </p>
    );
  }

  return null;
};

export default ErrorMessage2;
