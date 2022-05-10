import React from 'react';
import { useRouter } from 'next/router';

import { useAppContext } from '../../../../../lib/Store/AppContext';
import { EDIT_LOCATION } from '../../../../Modal/constants';
import { modalOpen, ModalOpenPayload } from '../../../../Modal/actions';
import UserDetailAddButton from '../../../../../Components/Elements/UserDetailSection/AddButton';
import { useGetUserDetailQuery } from '../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';

interface IProps {}

const EditLocationButton: React.FC<IProps> = () => {
  const { username } = activeUserDetail();
  const {
    data: {
      getUserDetail: {
        userMeta: { myUser },
      },
    },
  } = useGetUserDetailQuery({
    variables: { username },
  });

  if (!myUser) return null;

  const router = useRouter();

  const { dispatch } = useAppContext();

  return (
    <UserDetailAddButton
      type="submit"
      onClick={() => {
        const modalSettings: ModalOpenPayload = {
          modalType: EDIT_LOCATION,
          modalProps: {},
          originURL: router.asPath,
          modalTargetURL: `locations/edit-locations`,
          size: 'medium',
          title: 'Edit Location',
        };
        return dispatch(modalOpen(modalSettings));
      }}
    />
  );
};

export default EditLocationButton;
