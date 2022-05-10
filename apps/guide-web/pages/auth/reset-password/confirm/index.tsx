import React from 'react';
import { NextPageContext, NextPage } from 'next';
import PasswordConfirmComp from '../../../../src/Container/Auth/ForgotPassword/Confirm/ConfirmComp';

interface IProps {
  query: {
    token: string;
    username: string;
  };
}

const ConfirmPasswordPage: NextPage<IProps> = ({ query }) => {
  return <PasswordConfirmComp query={query} />;
};

interface Context extends NextPageContext {
  query: { token: string; username: string };
}
ConfirmPasswordPage.getInitialProps = ({ query }: Context) => {
  return { query };
};

export default ConfirmPasswordPage;
