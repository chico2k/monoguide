import React from 'react';
import { NextPageContext, NextPage } from 'next';
import ChangeEmailComp from '../../../../src/Container/Auth/ChangeEmail/Confirm/ChangeEmailConfirmComp';

interface IProps {
  query: {
    token: string;
  };
}

const ChangeEmailConfirmPage: NextPage<IProps> = ({ query }) => {
  const { token } = query;
  return <ChangeEmailComp token={token} data-test='activateEmail' />;
};

interface Context extends NextPageContext {
  query: { token: string };
}
ChangeEmailConfirmPage.getInitialProps = ({ query }: Context) => {
  return { query };
};

export default ChangeEmailConfirmPage;
