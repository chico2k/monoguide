import produce from 'immer';
import {
  GetUserDetailDocument,
  GetUserDetailQuery,
  ImageHits_Inner,
  useSetExistingImageAsAvatarMutation,
} from '../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';
import { useAppContext } from '../../../../../lib/Store/AppContext';
import { modalClose } from '../../../../Modal/actions';

const useImageSetAvatar = () => {
  const { username } = activeUserDetail();
  const { dispatch, state: appState } = useAppContext();
  const modalOpen = appState.modalState.open;

  const [setExistingImageAsAvatar] = useSetExistingImageAsAvatarMutation();
  const imageSetAvatarHandler = async ({
    image,
    setLoading,
  }: {
    image: ImageHits_Inner;
    setLoading: (state: boolean) => void;
  }) => {
    try {
      setLoading(true);
      await setExistingImageAsAvatar({
        variables: {
          imageId: +image._id,
        },

        optimisticResponse: {
          setExistingImageAsAvatar: {
            __typename: 'Avatar',
            blur_base64: image._source.blur_base64,
            url: image._source.url,
          },
        },

        update: (store, { data: { setExistingImageAsAvatar } }) => {
          if (!setExistingImageAsAvatar) return null;

          // Get current User from Store
          const { getUserDetail } = store.readQuery<GetUserDetailQuery>({
            query: GetUserDetailDocument,
            variables: { username },
          });

          // Get updated User
          const updatedUser = produce(getUserDetail, (draft) => {
            draft.user.avatar.url = image._source.url;
            draft.user.avatar.blur_base64 = image._source.blur_base64;
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
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  return {
    imageSetAvatarHandler,
  };
};

export default useImageSetAvatar;
