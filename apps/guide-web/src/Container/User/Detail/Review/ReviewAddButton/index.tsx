import React from 'react';
import { useRouter } from 'next/router';
import UserDetailAddButton from '../../../../../Components/Elements/UserDetailSection/AddButton';
import { useAppContext } from '../../../../../lib/Store/AppContext';
import { modalOpen, ModalOpenPayload } from '../../../../Modal/actions';
import { ADD_REVIEW } from '../../../../Modal/constants';
import { useGetUserDetailQuery } from '../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';

interface IProps {}

const AddReviewButton: React.FC<IProps> = () => {
  const { username } = activeUserDetail();

  const {
    data: {
      getUserDetail: {
        userMeta: { hasReviewed, myUser },
      },
    },
  } = useGetUserDetailQuery({
    variables: { username } as any,
  });

  console.log('AddReviewButton', hasReviewed, myUser);

  if (myUser || hasReviewed) {
    return null;
  }

  const router = useRouter();

  const { dispatch } = useAppContext();

  const modalSettings: ModalOpenPayload = {
    modalType: ADD_REVIEW,
    modalProps: {},
    originURL: router.asPath,
    modalTargetURL: `add-review`,
    size: 'full',
    title: 'Add Review',
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

export default AddReviewButton;
