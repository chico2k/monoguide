import React from 'react';
import { UserListReviewFragment } from '../../../../../../generated/graphql';
import RatingComponent from '../../../../../Components/Elements/Rating';

interface IProps {
  reviewMeta: UserListReviewFragment;
}

const UserListCardReview: React.FC<IProps> = ({ reviewMeta }) => {
  const numberRatings = reviewMeta && (
    <span className="text-xs ml-2 text-gray-500 italic">{reviewMeta.number_rating} ratings</span>
  );

  const noRating = !reviewMeta && <span className="text-xs ml-2 text-gray-500 italic">No ratings yet</span>;

  return (
    <div className="flex flex-col items-center">
      <RatingComponent currentRating={reviewMeta?.average_rating} />
      {numberRatings}
      {noRating}
    </div>
  );
};

export default UserListCardReview;
