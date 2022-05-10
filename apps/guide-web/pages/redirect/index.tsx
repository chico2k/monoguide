import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Auth from '@aws-amplify/auth';

import { awsConfig } from '../../awsconfig';

import { urlSafeDecode } from '@aws-amplify/core';
import { useRouter } from 'next/router';

Auth.configure(awsConfig.Auth);

interface IProps {
  state?: {
    provider: string;
    redirect: string;
  };
  reFederated: boolean;
}

const Redirect: NextPage<IProps> = ({ reFederated, state }) => {
  if (reFederated) {
    Auth.federatedSignIn({
      provider: state.provider,
      customState: JSON.stringify(state),
    } as any);
    return null;
  }

  if (!reFederated && state?.redirect) {
    const router = useRouter();
    router.push(state.redirect);
  }

  return <div>You have been successfully logged in!</div>;
};

export default Redirect;

interface Context extends NextPageContext {
  query: { state: string; reFederated: string };
}

export const getServerSideProps = async (context: Context) => {
  const { query } = context;

  if (query['error_description']) {
    context.res.writeHead(302, {
      Location: `/redirect/?state=${query.state}&reFederated=true}`,
    });
    context.res.end();
  }
  const reFederated = !!query.reFederated;

  if (!query.state) return { props: { reFederated } };

  const state = urlSafeDecode(query.state.split('-')[1]);
  const parsedState = JSON.parse(state);

  return { props: { reFederated, state: parsedState } };
};
