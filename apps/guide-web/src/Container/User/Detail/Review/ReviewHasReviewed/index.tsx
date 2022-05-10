import React from 'react';
import { useGetUserDetailQuery } from '../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';

const ReviewHasReviewed = () => {
  const { username } = activeUserDetail();

  const {
    data: {
      getUserDetail: {
        userMeta: { hasReviewed },
      },
    },
  } = useGetUserDetailQuery({
    variables: { username } as any,
  });

  if (!hasReviewed) return null;
  return (
    <div>
      <span className="text-xs text-gray-400">You have rated this Person already</span>
    </div>
  );
};

export default ReviewHasReviewed;
