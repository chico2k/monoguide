import React from 'react';
import { useGetUserDetailQuery } from '../../../../../generated/graphql';
import Title from '../../../../Components/Elements/Title';
import UserDetailSection from '../../../../Components/Elements/UserDetailSection';
import UserDetailSectionHeader from '../../../../Components/Elements/UserDetailSection/UserDetailSectionHeader';
import { activeUserDetail } from '../../../../lib/Apollo/reactiveVars';
import ImageAvatarButton from '../Image/ImageAvatarButton';
import ImageAvatar from '../Image/ImageAvatarImage';

interface IProps {}

const UserDetailHeader: React.FC<IProps> = () => {
  const { username } = activeUserDetail();
  const { data, error, loading } = useGetUserDetailQuery({
    variables: { username } as any
  });

  if (loading) return <div>Loading</div>;
  if (error)
    return (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );

  const {
    getUserDetail: {
      user: { firstName, lastName, isGuide },
      userMeta: { myUser }
    }
  } = data;

  return (
    <>
      <UserDetailSection>
        <UserDetailSectionHeader>
          <Title>
            {firstName + ' '} {lastName}
          </Title>
          <div>
            <ImageAvatar />
          </div>
        </UserDetailSectionHeader>
        <div className="grid grid-cols-3">
          <div className="text-sm col-span-2">
            <div className="flex fex-col">
              <div>
                Username
                <span> {username}</span>
                <p>
                  Guide
                  {isGuide ? <span>Yes</span> : <span> No</span>}
                </p>
                <p>
                  My Profile
                  {myUser ? <span> Yes</span> : <span> No</span>}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <ImageAvatarButton />
          </div>
        </div>
      </UserDetailSection>
    </>
  );
};

export default UserDetailHeader;
