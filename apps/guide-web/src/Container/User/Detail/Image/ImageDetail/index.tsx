import React, { useState } from 'react';
import { ImageHits_Inner } from '../../../../../../generated/graphql';
import NextImage from 'next/image';
import Spinner from '../../../../../Components/Spinner';
import ImageDetailMenu from './ImageDetailMenu';

interface IProps {
  image: ImageHits_Inner;
}

const ImageDetail: React.FC<IProps> = ({ image }) => {
  const [loading, setLoading] = useState(false);

  if (loading) return <Spinner />;

  return (
    <div
      className="
      py-2

      w-full 
      h-2/5

 
      md:h-4/5

      lg:w-4/5
      lg:h-full"
    >
      <div className="flex justify-end">
        <ImageDetailMenu image={image} setLoading={setLoading} />
      </div>
      <div className="" style={{ position: 'relative', width: '100%', height: '100%' }}>
        <NextImage src={image._source.url} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default ImageDetail;
