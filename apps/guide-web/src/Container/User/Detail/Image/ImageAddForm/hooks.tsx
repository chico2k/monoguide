import { useApolloClient } from '@apollo/client';
import axios from 'axios';
import produce from 'immer';
import { useContext, useState } from 'react';
import {
  GetUploadImageListDocument,
  GetUploadImageListQuery,
  useCreateUploadUrlMutation,
  useGetUploadImageDetailMutation,
  usePostUploadMutation,
} from '../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';
import { Context } from '../../../../../lib/Store/AppContext';
import { modalClose } from '../../../../Modal/actions';

const useImageAdd = () => {
  const { username } = activeUserDetail();

  const [state, setState] = useState({
    submitting: false,
  });

  const [createUploadUrl] = useCreateUploadUrlMutation();
  const [postUpload] = usePostUploadMutation();
  const [getUploadImageDetail] = useGetUploadImageDetailMutation();

  const { dispatch, state: appState } = useContext(Context);

  const modalOpen = appState.modalState.open;

  const apollo = useApolloClient();

  const submitHandler = async ({ caption, location, image, isProfileImage }) => {
    try {
      setState(
        produce((draft) => {
          draft.submitting = true;
        }),
      );

      if (location) {
        delete location.geometry.__typename;
        delete location.__typename;
      }

      if (location && location.context !== null) {
        location.context.map((item: any) => {
          if (!item.__typename) return null;
          delete item.__typename;
        });
      }

      const resp = await createUploadUrl({
        variables: {
          data: {
            caption,
            location: location
              ? {
                  id: location.id,
                  place_type: location.place_type,
                  place_name: location.place_name,
                  geometry: location.geometry,
                  context: location.context,
                  text: location.text,
                }
              : null,
            uploadType: 'IMAGE',
            origin: 'GALLERY',
            isProfileImage,
            mimeType: image[0].type,
            fileName: image[0].name,
          },
        },
      });

      if (!resp.data) return;
      const {
        createUploadUrl: { signedUrl, fileKey },
      } = resp.data;

      // Add new Image
      const formData = new FormData();
      formData.append('file', image[0]);

      await axios.put(signedUrl, formData);

      // Needs to be cleaned for Production
      await postUpload({
        variables: {
          fileKey,
        },
      });

      const o = new URLSearchParams(signedUrl).get('x-amz-meta-o');

      const {
        data: {
          getUploadImageDetail: {
            hits: { hits: newImage },
          },
        },
      } = await getUploadImageDetail({ variables: { id: +o } });

      const { getUploadImageList } = apollo.readQuery<GetUploadImageListQuery>({
        query: GetUploadImageListDocument,
        variables: { username },
      });

      console.log('newImage', newImage);

      // Get updated Image Array
      const updateImageList = produce(getUploadImageList, (draft) => {
        draft.hits.hits = [...newImage, ...draft.hits.hits];
      });

      apollo.writeQuery({
        query: GetUploadImageListDocument,
        variables: { username },
        data: {
          getUploadImageList: updateImageList,
        },
      });

      setState(
        produce((draft) => {
          draft.submitting = false;
        }),
      );

      if (modalOpen) {
        window.history.pushState(null, '', appState.modalState.originURL);
        return dispatch(modalClose());
      }
    } catch (error) {
      console.log('error', error);
      setState(
        produce((draft) => {
          draft.submitting = false;
        }),
      );

      if (modalOpen) {
        window.history.pushState(null, '', appState.modalState.originURL);
        return dispatch(modalClose());
      }
    }
  };

  return { submitting: state.submitting, submitHandler };
};

export default useImageAdd;
