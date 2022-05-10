import produce from 'immer';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import {
  GetUserDetailDocument,
  GetUserDetailQuery,
  useCreateLocationMutation,
} from '../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';
import { Context } from '../../../../../lib/Store/AppContext';
import { modalClose } from '../../../../Modal/actions';

interface IEditLocationParams {
  location: any;
}

const useEditLocation = () => {
  const { username } = activeUserDetail();

  const [createLocation] = useCreateLocationMutation();
  const router = useRouter();
  const { dispatch, state: appState } = useContext(Context);
  const modalOpen = appState.modalState.open;

  const editLocationSubmitHandler = async ({ location }: IEditLocationParams) => {
    try {
      delete location.geometry.__typename;
      delete location.__typename;

      if (location.context !== null) {
        location.context.map((item: any) => {
          if (!item.__typename) return null;
          delete item.__typename;
        });
      }

      await createLocation({
        variables: {
          data: {
            id: location.id,
            place_type: location.place_type,
            place_name: location.place_name,
            geometry: location.geometry,
            context: location.context,
            text: location.text,
          },
        },
        update: (store, { data: { createLocation } }) => {
          if (!createLocation) return null;

          // Get current User from Store
          const { getUserDetail } = store.readQuery<GetUserDetailQuery>({
            query: GetUserDetailDocument,
            variables: { username },
          });

          // Get updated User
          const updatedUser = produce(getUserDetail, (draft) => {
            draft.user.location = createLocation;
          });

          // Update User
          store.writeQuery({
            variables: { username },
            query: GetUserDetailDocument,
            data: {
              getUserDetail: updatedUser,
            },
          });
        },
      });
      if (modalOpen) {
        window.history.pushState(null, '', appState.modalState.originURL);
        return dispatch(modalClose());
      }

      router.push(`/profiles/${username}`);
    } catch (error) {
      console.log('Error useEditLocation', error);
      dispatch(modalClose());
    }
  };

  return {
    editLocationSubmitHandler,
  };
};

export default useEditLocation;
