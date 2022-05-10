import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useGetUploadImageListQuery } from '../../../../../../generated/graphql';
import { Context } from '../../../../../lib/Store/AppContext';
import NextImage from 'next/image';
import { GET_IMAGE_DETAIL } from '../../../../Modal/constants';
import { ModalOpenPayload, modalOpen } from '../../../../Modal/actions';
import ImageOverviewLoadMore from '../ImageOverviewLoadMore';
import Spinner from '../../../../../Components/Spinner';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';

interface IProps {}

const ImageOverview: React.FC<IProps> = () => {
  const { username } = activeUserDetail();

  const { dispatch } = useContext(Context);
  const router = useRouter();

  const [loadingMore, setLoadingMore] = useState(false);

  let content: React.ReactNode;

  const { data, loading } = useGetUploadImageListQuery({
    variables: {
      username,
      limit: 5,
    },
  });
  if (loading) return <Spinner />;

  const {
    getUploadImageList: { pageInfo },
  } = data;

  content = data.getUploadImageList.hits.hits.map((image, index) => {
    const modalSettings: ModalOpenPayload = {
      modalType: GET_IMAGE_DETAIL,
      modalProps: { username, url: image._source.url },
      originURL: router.asPath,
      modalTargetURL: `gallery/${image._source.fileName}`,
      size: 'full',
      title: 'Gallery',
    };

    return (
      <div
        key={index}
        className="border border-solid border-white   "
        style={{ position: 'relative', width: '260px', height: '200px' }}
      >
        <NextImage
          src={image._source.url}
          placeholder="blur"
          blurDataURL={image._source.blur_base64}
          layout="fill"
          objectFit="cover"
          onClick={() => {
            dispatch(modalOpen(modalSettings));
          }}
        />
      </div>
    );
  });

  return (
    <>
      <div
        className="grid grid-cols-1
     gap-4 grid-flow-row 
     
     md:grid-cols-2
     lg:grid-cols-5"
      >
        {content}
      </div>
      <div className="">{loadingMore && <Spinner />}</div>
      <div className="mt-5">
        {pageInfo.nextPage && <ImageOverviewLoadMore username={username} setLoadingMore={setLoadingMore} />}
      </div>
    </>
  );
};

export default ImageOverview;
