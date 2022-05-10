import produce from 'immer';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import {
  GetSportRefListDocument,
  GetSportRefListQuery,
  GetUserDetailDocument,
  GetUserDetailQuery,
  useDeleteSportMutation,
  useGetSportRefListQuery
} from '../../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../../lib/Apollo/reactiveVars';
import { Context } from '../../../../../../lib/Store/AppContext';
import { modalClose } from '../../../../../Modal/actions';

interface ISportDeleteParams {
  sportId: number;
  sportRef: { title: string; id: number };
}

const useSportDelete = () => {
  const { username } = activeUserDetail();

  const [deleteSport] = useDeleteSportMutation();
  const { dispatch, state } = useContext(Context);
  const router = useRouter();
  const modalOpen = state.modalState.open;

  useGetSportRefListQuery();

  const sportDeleteSubmitHandler = async ({
    sportId,
    sportRef
  }: ISportDeleteParams) => {
    try {
      await deleteSport({
        variables: {
          sportId
        },

        update: (store, { data: { deleteSport } }) => {
          if (!deleteSport) return null;

          //  User from Store
          const { getUserDetail } = store.readQuery<GetUserDetailQuery>({
            query: GetUserDetailDocument,
            variables: { username }
          });

          // Sport List from Store
          const {
            user: { sport: currentSports }
          } = getUserDetail;

          // Current Sport Types
          const test = store.readQuery<GetSportRefListQuery>({
            query: GetSportRefListDocument
          });

          const { getSportRefList } = test;

          // Update SportType Array
          const updatedSportType = produce(getSportRefList, (draft) => {
            draft.push({ title: sportRef.title, id: sportRef.id });
          });

          // Update Sport Array
          const updatedSport = produce(currentSports, (draft) => {
            const index = draft.findIndex((sport) => +sport.id === sportId);
            if (index !== -1) draft.splice(index, 1);
          });

          // Get updated User
          const updatedUser = produce(getUserDetail, (draft) => {
            draft.user.sport = updatedSport;
          });

          // Update Sports
          store.writeQuery({
            query: GetUserDetailDocument,
            variables: { username },
            data: {
              getUserDetail: updatedUser
            }
          });

          // Update Sport Types
          store.writeQuery({
            query: GetSportRefListDocument,
            data: {
              getSportTypeList: updatedSportType
            }
          });
        }
      });
      if (modalOpen) {
        window.history.pushState(null, '', state.modalState.originURL);
        return dispatch(modalClose());
      }
      router.push(`/profiles/${username}`);
    } catch (error) {
      console.log(error);
      dispatch(modalClose());
    }
  };

  return {
    sportDeleteSubmitHandler
  };
};
export default useSportDelete;
