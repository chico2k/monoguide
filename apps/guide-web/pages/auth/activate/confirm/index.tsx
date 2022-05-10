import React from 'react';
import { NextPageContext, NextPage } from 'next';
import ActivateUserComp from '../../../../src/Container/Auth/Activate/ActivateComp';
import { awsConfig } from '../../../../awsconfig';
import Auth from '@aws-amplify/auth';

interface IProps {
  query: {
    token: string;
    username: string;
  };
}

Auth.configure(awsConfig.Auth);

const ActivateUserPage: NextPage<IProps> = ({ query }) => {
  return <ActivateUserComp query={query} />;
};

interface Context extends NextPageContext {
  query: { username: string; token: string };
}
ActivateUserPage.getInitialProps = ({ query }: Context) => {
  return { query };
};

export default ActivateUserPage;
