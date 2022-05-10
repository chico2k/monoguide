import React from 'react';
import { useRouter } from 'next/router';
import { EDIT_SPORT } from '../../../../../Modal/constants';
import { modalOpen, ModalOpenPayload } from '../../../../../Modal/actions';
import { useAppContext } from '../../../../../../lib/Store/AppContext';
import UserDetailEditButton from '../../../../../../Components/Elements/UserDetailSection/EditButton';
import { activeUserDetail } from '../../../../../../lib/Apollo/reactiveVars';
import { useGetUserDetailQuery } from '../../../../../../../generated/graphql';

interface IProps {
  sportId: number;
  level: number;
}

const SportEditButton: React.FC<IProps> = ({ sportId, level }) => {
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
    <UserDetailEditButton
      type="submit"
      onClick={() => {
        const modalSettings: ModalOpenPayload = {
          modalType: EDIT_SPORT,
          modalProps: { sportId, level },
          originURL: router.asPath,
          modalTargetURL: `sports/${sportId}/edit-sports`,
          size: 'medium',
          title: 'Edit Sport',
        };
        return dispatch(modalOpen(modalSettings));
      }}
    />
  );
};

export default SportEditButton;
