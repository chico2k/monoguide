import React, { memo } from 'react';
import shortid from 'shortid';
import { Error } from './style';

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

const ErrorMessage: React.FC<IProps> = ({ errors, touched, name, status }) => {
  const fieldErrors = errors && errors[name] ? errors[name] : null;

  const fieldTouched = touched && touched[name] ? touched[name] : null;
  const fieldStatus = status && status[name] ? status[name] : null;

  if (fieldStatus) {
    if (Array.isArray(fieldStatus)) {
      const fieldErrorOutput = fieldStatus.map((msg: string) => {
        return (
          <Error data-test='errorText' key={shortid.generate()}>
            {msg}
          </Error>
        );
      });
      return <>{fieldErrorOutput} </>;
    }
    const fieldErrorOutput = <Error data-test='errorText'>{fieldStatus}</Error>;
    return fieldErrorOutput;
  }
  if (fieldErrors && fieldTouched) {
    const fieldErrorOutput = <Error data-test='errorText'>{fieldErrors}</Error>;
    return fieldErrorOutput;
  }
  const fieldErrorOutput = <Error data-test='errorText' />;
  return fieldErrorOutput;
};

export default memo(ErrorMessage);
