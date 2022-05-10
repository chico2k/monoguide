import React from 'react';
import UserDetailHeader from './header';
import UserDetailImage from './Image';
import UserDetailLocation from './Location';
import UserDetailReview from './Review';
import UserDetailSport from './Sport/SportSection';

interface IProps {}

const DetailSections: React.FC<IProps> = () => {
  return (
    <div
      data-test="detail-section"
      className="p-6 bg-white flex flex-col m-auto align-middle space-y-6 max-w-screen-lg "
    >
      <UserDetailHeader />
      <UserDetailSport />
      {/* <UserDetailLocation />
      <UserDetailImage />
      <UserDetailReview /> */}
    </div>
  );
};

export default DetailSections;
