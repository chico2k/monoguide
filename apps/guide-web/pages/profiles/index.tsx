import React from 'react';
import { NextPage, NextPageContext } from 'next';
import {
  addApolloState,
  initializeApollo
} from '../../src/lib/Apollo/apolloClient';
import { GetUserListDocument } from '../../generated/graphql';
import UserListContainer from '../../src/Container/User/List';
import { withServerSideAuth } from '@clerk/nextjs/ssr';

interface IProps {
  username: string;
}

interface Context extends NextPageContext {
  query: { username: string };
}

const UserListPage: NextPage<IProps> = () => <UserListContainer />;
export default UserListPage;

export const getServerSideProps = withServerSideAuth(async (ctx: Context) => {
  const apolloClient = initializeApollo(undefined, ctx);

  try {
    const what = await apolloClient.query({
      query: GetUserListDocument
    });
    return addApolloState(apolloClient, {
      props: {}
    });
  } catch (error) {
    console.log('error', { ...error });
  }
});
