import React from 'react';
import LoginForm from '../LoginForm';

interface IProps {
  query?: { redirect: string };
}

const LoginComp: React.FC<IProps> = ({ query }) => {
  return (
    <>
      <LoginForm query={query} />
    </>
  );
};

export default LoginComp;
