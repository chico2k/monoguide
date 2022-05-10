import React from 'react';
import { useGetUserDetailQuery } from '../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';
import NextImage from 'next/image';
import NoAvatar from '../../../../../Components/Elements/Avatar/NoAvatar';

const ImageAvatar = () => {
  const { username } = activeUserDetail();
  const { data, error, loading } = useGetUserDetailQuery({
    variables: { username },
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
      user: { avatar },
    },
  } = data;

  const avatarImage = avatar && (
    <NextImage
      src={avatar.url}
      blurDataURL={avatar.blur_base64}
      objectFit="cover"
      draggable="false"
      placeholder="blur"
      className="inline-block w-12 h-12 rounded-full ring-2 ring-white"
      width={300}
      height={300}
    />
  );

  const noAvatarImage = !avatar && <NoAvatar />;

  return (
    <div className="grid overflow-hidden w-24 h-24">
      {avatarImage} {noAvatarImage}
    </div>
  );
};

export default ImageAvatar;
