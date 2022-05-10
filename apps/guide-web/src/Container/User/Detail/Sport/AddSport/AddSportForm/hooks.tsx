import produce from 'immer';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import {
  GetSportRefListDocument,
  GetSportRefListQuery,
  GetUserDetailDocument,
  GetUserDetailQuery,
  useCreateSportMutation
} from '../../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../../lib/Apollo/reactiveVars';
import { Context } from '../../../../../../lib/Store/AppContext';
import { modalClose } from '../../../../../Modal/actions';

interface IAddSportSubmitParams {
  sportRef?: number;
  level?: number;
}

interface IData {
  getSportRefList?: {
    __typename?: string;
    title: string;
    id: number;
  }[];
}

const useAddSport = () => {
  const { username } = activeUserDetail();

  const { dispatch, state: appState } = useContext(Context);
  const router = useRouter();
  const modalOpen = appState.modalState.open;
  const [createSport] = useCreateSportMutation();

  const loadOptions = async (input: string, data: IData) => {
    try {
      const { getSportRefList } = data;
      const list = filterList(getSportRefList, input);
      return list.map((entry) => {
        return {
          label: entry.title,
          value: entry.id
        };
      });
    } catch (err) {
      return null;
    }
  };

  const filterList = (
    data: { id: number; title: string }[],
    inputValue: string
  ) => {
    const list = data.filter((i) =>
      i.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    return list;
  };

  const addSportSubmitHandler = async ({
    sportRef,
    level
  }: IAddSportSubmitParams) => {
    console.log('h');
    try {
      await createSport({
        variables: {
          level: +level,
          sportRefId: sportRef
        },
        update: (store, { data: { createSport } }) => {
          if (!createSport) return null;
          // Get current Sport Types
          const currentSportTypes = store.readQuery<GetSportRefListQuery>({
            query: GetSportRefListDocument
          });

          // Get current User from Store
          const { getUserDetail } = store.readQuery<GetUserDetailQuery>({
            query: GetUserDetailDocument,
            variables: { username }
          });
          // New Sport to be added to Store
          const newSport = {
            __typename: 'Sport' as const,
            id: createSport.id,
            level: createSport.level,
            sportRef: {
              __typename: 'SportRef' as const,
              id: createSport.sportRef.id,
              title: createSport.sportRef.title
            }
          };
          // Current Sport List
          const { user } = getUserDetail;
          // Init Array if no Sports added yet
          if (!user.sport) user.sport = [];
          // Get updated Sport Array
          const updatedSport = produce(user.sport, (draft) => {
            draft.push(newSport);
          });
          // Get updated User
          const updatedUser = produce(getUserDetail, (draft) => {
            draft.user.sport = updatedSport;
          });
          // Remove selected SportType from List
          const updateSportType = produce(
            currentSportTypes.getSportRefList,
            (draft) => {
              const index = draft.findIndex(
                (sportType) => sportType.title === createSport.sportRef.title
              );
              if (index !== -1) draft.splice(index, 1);
            }
          );

          // Update User
          store.writeQuery({
            variables: { username },
            query: GetUserDetailDocument,
            data: {
              getUserDetail: { ...updatedUser }
            }
          });
          // Update SportTypes
          store.writeQuery({
            query: GetSportRefListDocument,
            data: {
              getSportTypeList: updateSportType
            }
          });
        }
      });
      if (modalOpen) {
        window.history.pushState(null, '', appState.modalState.originURL);
        return dispatch(modalClose());
      }
      router.push(`/profiles/${username}`);
    } catch (error) {
      console.log('error', error);
      if (modalOpen) {
        window.history.pushState(null, '', appState.modalState.originURL);
        return dispatch(modalClose());
      }
    }
  };
  return {
    addSportSubmitHandler,
    loadOptions
  };
};

export default useAddSport;
