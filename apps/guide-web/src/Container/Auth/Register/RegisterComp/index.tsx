import Auth from '@aws-amplify/auth';

import React, { useState } from 'react';
import Spinner from '../../../../Components/Spinner/';
import RegisterFrom from '../RegisterForm';

const RegisterComp: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);

  const loginFacebook = async () => {
    setSubmitting(true);

    const customState = {
      provider: 'Facebook',
      redirect: '/cockpit',
    };
    Auth.federatedSignIn({
      provider: 'Facebook',
      customState: JSON.stringify(customState),
    } as any);
  };

  if (submitting) return <Spinner />;
  return (
    <div data-test='register'>
      <RegisterFrom />
      <button onClick={async () => await loginFacebook()}>Open Facebook</button>
    </div>
  );
};

export default RegisterComp;
