import React from 'react';
import AddSportButton from '../AddSport/AddSportButton';
import Title from '../../../../../Components/Elements/Title';
import UserDetailSection from '../../../../../Components/Elements/UserDetailSection';
import SportSectionItemList from './SportSectionItem';
import SportSectionNoItems from './SportSectionNoItems';
import UserDetailSectionHeader from '../../../../../Components/Elements/UserDetailSection/UserDetailSectionHeader';

interface IProps {}

const UserDetailSport: React.FC<IProps> = () => {
  return (
    <>
      <UserDetailSection>
        <UserDetailSectionHeader>
          <Title>Sports</Title>
          <AddSportButton data-test="add-button" />
        </UserDetailSectionHeader>
        <SportSectionItemList />
        <SportSectionNoItems />
      </UserDetailSection>
    </>
  );
};

export default UserDetailSport;
