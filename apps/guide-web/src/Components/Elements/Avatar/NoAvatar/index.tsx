import React from 'react';
import no_avatar from '../../../../../public/no_avatar.jpg';
import NextImage from 'next/image';

const NoAvatar = () => {
  return (
    <NextImage
      src={no_avatar}
      objectFit="cover"
      draggable="false"
      placeholder="blur"
      className="inline-block rounded-full ring-2 ring-white"
      width={300}
      height={300}
    />
  );
};

export default NoAvatar;
