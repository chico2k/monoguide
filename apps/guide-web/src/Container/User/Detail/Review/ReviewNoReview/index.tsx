import React from 'react';
import { useGetReviewListQuery } from '../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';

const ReviewNoReview = () => {
  const { username } = activeUserDetail();

  const { data, error, loading } = useGetReviewListQuery({
    variables: { username } as any,
  });

  if (loading) return <div>Loading</div>;
  if (error)
    return (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );

  const {
    getReviewList: {
      hits: { hits },
    },
  } = data;

  if (hits.length > 0) return null;

  return (
    <div>
      <span> No Reviews yet </span>
    </div>
  );
};

export default ReviewNoReview;
