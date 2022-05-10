import React from 'react';
// import { getCookie } from '@management/axios';
import { NextPageContext, NextPage } from 'next';
import { redirectHandler } from './redirectHOC';
import { withSSRContext } from 'aws-amplify';

// Auth Wrapper
const pageWrapper = (isProtected: boolean) => (WrappedComponent: NextPage) => {
  const WrappedWithAuth = (props: any) => {
    return <WrappedComponent {...props} />;
  };

  WrappedWithAuth.getInitialProps = async (ctx: NextPageContext) => {
    const { Auth } = withSSRContext(ctx);

    const user = await Auth.currentSession();

    const accessToken = user.getIdToken().getJwtToken();

    if (accessToken === '' && isProtected) {
      redirectHandler(ctx, '/auth/login');
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      ((await WrappedComponent.getInitialProps({ ...ctx })) as any);

    return {
      ...componentProps,
    };
  };

  return WrappedWithAuth;
};

export default pageWrapper;
