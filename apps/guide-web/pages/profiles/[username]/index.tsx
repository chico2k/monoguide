import React from 'react';
import { NextPage, NextPageContext } from 'next';
import {
  GetUserDetailDocument,
  GetReviewListDocument,
  GetUploadImageListDocument,
  useGetUserDetailQuery,
  useGetReviewListQuery,
  useGetUploadImageListQuery
} from '../../../generated/graphql';
import {
  addApolloState,
  initializeApollo
} from '../../../src/lib/Apollo/apolloClient';

import Amplify, { withSSRContext } from 'aws-amplify';
import { awsConfig } from '../../../awsconfig';
import DetailSections from '../../../src/Container/User/Detail';
import { activeUserDetail } from '../../../src/lib/Apollo/reactiveVars';
import { withServerSideAuth } from '@clerk/nextjs/ssr';

Amplify.configure({ ...awsConfig, ssr: true });

interface IProps {
  username: string;
  userId: string;
}

const UserDetailPage: NextPage<IProps> = ({ username, userId }) => {
  // const { data, error, loading } = useGetUserDetailQuery({
  //   variables: { username } as any,
  // });

  // useGetReviewListQuery({
  //   variables: { username },
  // });

  // useGetUploadImageListQuery({
  //   variables: {
  //     username,
  //     limit: 5,
  //   },
  // });

  // if (loading) return <div>Loading</div>;
  // if (error)
  //   return (
  //     <div>
  //       <pre>{JSON.stringify(error, null, 2)}</pre>
  //     </div>
  //   );
  // const {
  //   getUserDetail: {
  //     user: { id: userId },
  //   },
  // } = data;

  activeUserDetail({ username, userId });

  return <DetailSections />;
};

interface Context extends NextPageContext {
  query: { username: string };
}

export const getServerSideProps = withServerSideAuth(async (ctx: Context) => {
  const apolloClient = initializeApollo(undefined, ctx);
  try {
    const { username } = ctx.query;

    const resp = await Promise.all([
      apolloClient.query({
        query: GetUserDetailDocument,
        variables: { username }
      })

      // apolloClient.query({
      //   query: GetReviewListDocument,
      //   variables: { username },
      // }),

      // apolloClient.query({
      //   query: GetUploadImageListDocument,
      //   variables: { username, limit: 5 },
      // }),
    ]);

    const userId = resp[0].data.getUserDetail.user.id;

    activeUserDetail({ username, userId });
    // return {
    //   props: { username },
    // };

    return addApolloState(apolloClient, {
      props: { username, userId }
    });
  } catch (error) {
    console.log('error username', error);
    return addApolloState(apolloClient, {
      notFound: true
      // props: { username },
    });
  }
});

export default UserDetailPage;
