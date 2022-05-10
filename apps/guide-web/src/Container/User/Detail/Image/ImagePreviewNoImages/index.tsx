import React from 'react';
import { useGetUploadImageListQuery } from '../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';

const ImagePreviewNoImages = () => {
  const { username } = activeUserDetail();

  const { data, error, loading } = useGetUploadImageListQuery({
    variables: {
      username,
      limit: 5,
    },
  });

  const {
    getUploadImageList: {
      hits: { hits },
    },
  } = data;

  if (loading) return <div>Loading</div>;
  if (error)
    return (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );

  if (hits.length > 0) return null;
  return <div> No images yet</div>;
};

export default ImagePreviewNoImages;
