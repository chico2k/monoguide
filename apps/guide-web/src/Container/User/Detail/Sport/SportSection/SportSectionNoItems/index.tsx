import React from 'react';
import { useGetUserDetailQuery } from '../../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../../lib/Apollo/reactiveVars';

const SportSectionNoItems = () => {
  const { username } = activeUserDetail();

  const {
    data: {
      getUserDetail: {
        user: { sport },
      },
    },
  } = useGetUserDetailQuery({
    variables: { username } as any,
  });

  if (sport?.length > 0) return null;

  return <div>No Sports found</div>;
};

export default SportSectionNoItems;
