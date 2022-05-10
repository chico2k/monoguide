import { useRouter } from 'next/router';
import { useCreateReviewMutation } from '../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';
import { useAppContext } from '../../../../../lib/Store/AppContext';
import { modalClose } from '../../../../Modal/actions';

const useReviewAdd = () => {
  const { username, userId } = activeUserDetail();

  const { dispatch, state } = useAppContext();
  const router = useRouter();
  const [createReview] = useCreateReviewMutation();

  const modalOpen = state.modalState.open;

  const reviewAddSubmitHandler = async ({ text, rating, title }) => {
    try {
      await createReview({
        variables: {
          data: {
            text,
            rating,
            title,
            userId,
          },
        },
      });

      if (modalOpen) {
        window.history.pushState(null, '', state.modalState.originURL);
        return dispatch(modalClose());
      }
      router.push(`/profiles/${username}`);
    } catch (error) {
      console.log('error', error);
    }
  };

  return {
    reviewAddSubmitHandler,
  };
};

export default useReviewAdd;
