import { useRouter } from 'next/router';
import React from 'react';
import { useGetCurrentUsernameLazyQuery, useGetReviewListQuery } from '../../../../../../generated/graphql';
import RatingComponent from '../../../../../Components/Elements/Rating';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';
import { setLoading } from '../../../../../lib/Store/actions';
import { useAppContext } from '../../../../../lib/Store/AppContext';

const ReviewEntries = () => {
  const { username } = activeUserDetail();

  const { dispatch } = useAppContext();
  const [getCurrentUsername, { data: getCurrentUsernameData }] = useGetCurrentUsernameLazyQuery({
    onCompleted: () => {
      const { getCurrentUsername } = getCurrentUsernameData;
      router.push(`/profiles/${getCurrentUsername}`);
    },
  });

  const { data } = useGetReviewListQuery({
    variables: { username },
  });

  const {
    getReviewList: {
      hits: { hits },
    },
  } = data;

  const initGetCurrentUsername = (authorId: string) => {
    getCurrentUsername({ variables: { userId: authorId } });
  };

  if (hits.length > 1) return null;

  const router = useRouter();

  return hits.map((review) => {
    const { _source } = review;
    const createdAt = new Date(_source.created_at).toLocaleString();

    return (
      <div className="shadow-sm bg-white px-4 py-2 mx-4 my-2 rounded" key={_source.id}>
        <div className="flex justify-between">
          <div className="font-semibold text-sm">{_source.title}</div>
          <div>
            <RatingComponent currentRating={_source.rating} />
          </div>
        </div>
        <div className="py-5 text-sm">{_source.text}</div>
        <div className="flex text-xs justify-end text-gray-400">
          <p>
            <span> Created by: </span>
            <span
              className="cursor-pointer underline"
              onClick={() => {
                dispatch(setLoading(true));
                initGetCurrentUsername(_source.author.id);
              }}
            >
              {_source.author.name}
            </span>
            <span> on</span>

            <span> {createdAt}</span>
          </p>
        </div>
      </div>
    );
  });
};

export default ReviewEntries;
