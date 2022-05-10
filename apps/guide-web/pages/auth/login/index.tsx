import React from 'react';
import { NextPage, NextPageContext } from 'next';
import LoginComp from '../../../src/Container/Auth/Login/LoginComp';

interface IProps {
  query?: { redirect: string };
}

const LoginPage: NextPage<IProps> = ({ query }) => {
  return <LoginComp query={query} />;
};

interface Context extends NextPageContext {
  query: { redirect: string };
}

LoginPage.getInitialProps = ({ query }: Context) => {
  return { query };
};

export default LoginPage;
