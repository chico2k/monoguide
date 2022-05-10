import React from 'react';
import Title from '../../../../Components/Elements/Title';
import UserDetailSection from '../../../../Components/Elements/UserDetailSection';

import AddImageButton from './ImageAddButton';
import ImageOverviewButton from './ImageOverviewButton';
import { ImagePreview } from './ImagePreview';

interface IProps {}

const ImageComponent: React.FC<IProps> = () => {
  return (
    <>
      <UserDetailSection>
        <div className="flex flex-row justify-between items-center mb-6">
          <Title>Images</Title>
          <AddImageButton />
        </div>
        <ImagePreview />
        <ImageOverviewButton />
      </UserDetailSection>
    </>
  );
};

export default ImageComponent;
