import { useRouter } from 'next/router';
import React from 'react';
import { useGetUploadImageListQuery } from '../../../../../../generated/graphql';
import { useAppContext } from '../../../../../lib/Store/AppContext';
import { modalOpen, ModalOpenPayload } from '../../../../Modal/actions';
import { GET_IMAGE_DETAIL } from '../../../../Modal/constants';
import NextImage from 'next/image';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';
import ImagePreviewNoImages from '../ImagePreviewNoImages';

interface IProps {
  isMoving: boolean;
}

export const ImagePreviewCard = ({ isMoving }: IProps) => {
  const { username } = activeUserDetail();

  const { data, error, loading } = useGetUploadImageListQuery({
    variables: {
      username,
      limit: 5,
    },
  });

  if (loading) return <div>Loading</div>;
  if (error)
    return (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );

  const {
    getUploadImageList: {
      hits: { hits },
    },
  } = data;

  if (hits.length < 1) return <ImagePreviewNoImages />;

  const { dispatch } = useAppContext();
  const router = useRouter();

  return hits.map((image) => {
    const modalSettings: ModalOpenPayload = {
      modalType: GET_IMAGE_DETAIL,
      modalProps: { username, image, url: image._source.url, fileName: image._source.fileName },
      originURL: router.asPath,
      modalTargetURL: `gallery/${image._source.fileName}`,
      size: 'full',
      title: 'Gallery',
    };

    const imageComponent = (
      <NextImage
        src={image._source.url}
        blurDataURL={image._source.blur_base64}
        layout="fill"
        objectFit="cover"
        draggable="false"
        placeholder="blur"
        onClick={(e) => {
          if (isMoving) {
            e.preventDefault();
          } else {
            dispatch(modalOpen(modalSettings));
          }
        }}
      />
    );

    return (
      <div className="h-64  w-full px-1" key={image._id}>
        <div className="relative w-100 h-5/6 shadow-md">{imageComponent}</div>
        <div className="flex justify-between bg-white p-1 items-center h-1/6  ">
          <div className="flex flex-col">
            <p className="truncate text-sm "> {image._source.caption} </p>
            <p className="text-xs text-gray-400 truncate">{image._source.location?.text}</p>
          </div>
        </div>
      </div>
    );
  });
};

export default ImagePreviewCard;
