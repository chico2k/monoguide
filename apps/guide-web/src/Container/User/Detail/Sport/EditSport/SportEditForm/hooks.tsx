import produce from 'immer';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import {
  GetUserDetailDocument,
  GetUserDetailQuery,
  useUpdateSportMutation,
} from '../../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../../lib/Apollo/reactiveVars';
import { Context } from '../../../../../../lib/Store/AppContext';
import { modalClose } from '../../../../../Modal/actions';

interface ISportEditParams {
  level: number;
  sportId: number;
}

const useSportEdit = () => {
  const { username } = activeUserDetail();

  const [updateSport] = useUpdateSportMutation();
  const router = useRouter();
  const { dispatch, state } = useContext(Context);
  const modalOpen = state.modalState.open;

  const sportEditSubmitHandler = async ({ level, sportId }: ISportEditParams) => {
    try {
      await updateSport({
        variables: {
          sportId: +sportId,
          level: +level,
        },

        update: (cache, { data: { updateSport } }) => {
          if (!updateSport) return null;

          //  User from Store
          const { getUserDetail } = cache.readQuery<GetUserDetailQuery>({
            query: GetUserDetailDocument,
            variables: { username },
          });

          // Sport List from Store
          const {
            user: { sport: currentSports },
          } = getUserDetail;

          // Get updated Sport Array
          const updatedSport = produce(currentSports, (draft) => {
            const index = draft.findIndex((sport) => sport.id === +sportId);
            if (index !== -1) draft[index].level = +level;
          });

          // Get updated User
          const updatedUser = produce(getUserDetail, (draft) => {
            draft.user.sport = updatedSport;
          });

          // Update Sports
          cache.writeQuery({
            query: GetUserDetailDocument,
            variables: { username },
            data: {
              getUserDetail: updatedUser,
            },
          });
        },
      });
      if (modalOpen) {
        window.history.pushState(null, '', state.modalState.originURL);
        return dispatch(modalClose());
      }
      router.push(`/profiles/${username}`);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    sportEditSubmitHandler,
  };
};

export default useSportEdit;
