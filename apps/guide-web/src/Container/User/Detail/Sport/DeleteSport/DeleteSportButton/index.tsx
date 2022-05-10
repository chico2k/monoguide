import React from 'react';
import { useRouter } from 'next/router';
import { ModalOpenPayload, modalOpen } from '../../../../../Modal/actions';
import { DELETE_SPORT } from '../../../../../Modal/constants';
import { useAppContext } from '../../../../../../lib/Store/AppContext';
import UserDetailDeleteButton from '../../../../../../Components/Elements/UserDetailSection/DeleteButton';
import { activeUserDetail } from '../../../../../../lib/Apollo/reactiveVars';
import { useGetUserDetailQuery } from '../../../../../../../generated/graphql';

interface IProps {
  sportId: number;
  sportRef: { title: string; id: number };
}

const DeleteSportButton: React.FC<IProps> = ({ sportId, sportRef }) => {
  const router = useRouter();
  const { dispatch } = useAppContext();
  const { username } = activeUserDetail();

  const {
    data: {
      getUserDetail: {
        userMeta: { myUser }
      }
    }
  } = useGetUserDetailQuery({
    variables: { username }
  });

  if (!myUser) return null;
  return (
    <UserDetailDeleteButton
      type="submit"
      onClick={() => {
        const modalSettings: ModalOpenPayload = {
          modalType: DELETE_SPORT,
          modalProps: {
            sportId,
            sportRef
          },
          title: 'Delete Sport',
          size: 'small',
          originURL: router.asPath,
          modalTargetURL: `sports/${sportId}/delete-sports`
        };
        return dispatch(modalOpen(modalSettings));
      }}
    />
  );
};

export default DeleteSportButton;
