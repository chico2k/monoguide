import React from 'react';
import Title from '../../../../Components/Elements/Title';
import UserDetailSection from '../../../../Components/Elements/UserDetailSection';
import AddReviewButton from './ReviewAddButton';
import ReviewEntries from './ReviewEntries';
import ReviewHasReviewed from './ReviewHasReviewed';
import ReviewNoReview from './ReviewNoReview';

interface IProps {}

const UserDetailReview: React.FC<IProps> = () => {
  return (
    <UserDetailSection>
      <div className="flex flex-row justify-between items-center mb-6">
        <Title>Review</Title>

        <div>
          <AddReviewButton />
          <ReviewNoReview />
          <ReviewHasReviewed />
        </div>
      </div>
      <div>
        <div>{ReviewEntries()}</div>
      </div>
    </UserDetailSection>
  );
};

export default UserDetailReview;
