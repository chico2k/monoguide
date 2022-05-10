import React from 'react';
import NextImage from 'next/image';
import { UserListAvatarFragment } from '../../../../../../generated/graphql';
import NoAvatar from '../../../../../Components/Elements/Avatar/NoAvatar';

interface IProps {
  avatar: UserListAvatarFragment;
}

const UserListCardAvatar: React.FC<IProps> = ({ avatar }) => {
  if (!avatar)
    return (
      <div className="grid overflow-hidden w-24 h-24">
        <NoAvatar />
      </div>
    );

  return (
    <div className="grid overflow-hidden w-24 h-24">
      <NextImage
        src={avatar.url}
        blurDataURL={avatar.blur_base64}
        objectFit="cover"
        draggable="false"
        placeholder="blur"
        className="inline-block rounded-full ring-2 ring-white"
        width={300}
        height={300}
      />
    </div>
  );
};

export default UserListCardAvatar;
