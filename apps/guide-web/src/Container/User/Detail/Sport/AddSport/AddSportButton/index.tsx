import React from 'react';
import { useRouter } from 'next/router';
import { ADD_SPORT } from '../../../../../Modal/constants';
import { modalOpen, ModalOpenPayload } from '../../../../../Modal/actions';
import { useAppContext } from '../../../../../../lib/Store/AppContext';
import UserDetailAddButton from '../../../../../../Components/Elements/UserDetailSection/AddButton';
import { useGetUserDetailQuery } from '../../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../../lib/Apollo/reactiveVars';

interface IProps {}

const AddSportButton: React.FC<IProps> = ({}) => {
  
    const { dispatch } = useAppContext();
  const router = useRouter();
  const { username } = activeUserDetail();

  const {
    data: {
      getUserDetail: {
        userMeta: { myUser },
      },
    },
  } = useGetUserDetailQuery({
    variables: { username } as any,
  });

  if (!myUser) return null;

  const modalSettings: ModalOpenPayload = {
    modalType: ADD_SPORT,
    modalProps: {},
    originURL: router.asPath,
    modalTargetURL: `sports/add-sports`,
    size: 'medium',
    title: 'Add Sport',
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

export default AddSportButton;
