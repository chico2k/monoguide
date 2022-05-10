import React from 'react';
import { useRouter } from 'next/router';
import UserDetailAddButton from '../../../../../Components/Elements/UserDetailSection/AddButton';
import { useAppContext } from '../../../../../lib/Store/AppContext';
import { modalOpen, ModalOpenPayload } from '../../../../Modal/actions';
import { ADD_IMAGE } from '../../../../Modal/constants';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';
import { useGetUserDetailQuery } from '../../../../../../generated/graphql';

interface IProps {}

const AddImageButton: React.FC<IProps> = () => {
  const { username } = activeUserDetail();

  const { data } = useGetUserDetailQuery({
    variables: { username } as any,
  });
  const {
    getUserDetail: {
      userMeta: { myUser },
    },
  } = data;

  if (!myUser) return null;

  const router = useRouter();

  const { dispatch } = useAppContext();

  const modalSettings: ModalOpenPayload = {
    modalType: ADD_IMAGE,
    modalProps: {},
    originURL: router.asPath,
    modalTargetURL: `add-image`,
    size: 'medium',
    title: 'Add Image',
  };

  return (
    <UserDetailAddButton
      type="submit"
      onClick={() => {
        dispatch(modalOpen(modalSettings));
      }}
    />
  );
};

export default AddImageButton;
