import React from 'react';
import { useRouter } from 'next/router';
import { MdLocalSee } from 'react-icons/md';
import { useAppContext } from '../../../../../lib/Store/AppContext';
import { modalOpen, ModalOpenPayload } from '../../../../Modal/actions';
import { GET_IMAGE_OVERVIEW } from '../../../../Modal/constants';
import { useGetUploadImageListQuery } from '../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';

interface IProps {}

const ImageOverviewButton: React.FC<IProps> = () => {
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

  if (hits.length < 1) return null;

  const router = useRouter();

  const { dispatch } = useAppContext();

  const modalSettings: ModalOpenPayload = {
    modalType: GET_IMAGE_OVERVIEW,
    modalProps: {},
    originURL: router.asPath,
    modalTargetURL: `image`,
    size: 'full',
    title: 'Gallery',
  };

  return (
    <div className="flex justify-end">
      <button
        type="submit"
        onClick={() => {
          dispatch(modalOpen(modalSettings));
        }}
        data-test="button"
        className="flex flex-cols text-white bg-green-600  rounded-lg py-2 px-4 hover:text-green-600 hover:bg-white border border-solid border-green-600"
      >
        <div className="flex items-center">
          <MdLocalSee stroke="currentColor" height="32px" width="32px" className="mr-2" />
          <span>All images</span>
        </div>
      </button>
    </div>
  );
};

export default ImageOverviewButton;
