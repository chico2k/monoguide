import React from 'react';
import PasswordConfirmForm from '../ConfirmForm';

interface IProps {
  query: {
    username: string;
    token: string;
  };
}

const PasswordConfirmComp: React.FC<IProps> = ({ query }) => {
  return (
    <div data-test='reset-password-confirm'>
      <h3 data-test='title'>Set new Password</h3>
      <PasswordConfirmForm
        data-test='reset-password-confirm-form'
        query={query}
      />
    </div>
  );
};

export default PasswordConfirmComp;
