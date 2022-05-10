import Auth from '@aws-amplify/auth';
import { FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { pageIndex } from '../../../../pages/pageIndex';
import { ErrorMessage } from '../../../lib/Error';

interface IValues {
  email: string;
}

const useChangeEmailInit = () => {
  const router = useRouter();
  const useChangeEmailInitHandler = async ({ email }: IValues, { setStatus }: FormikHelpers<IValues>) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (!user) await router.push('/');

      await Auth.updateUserAttributes(user, { email });
      await router.push('/auth/change-email/init/');
    } catch (error) {
      if (ErrorMessage.getErrorMessage(error.code)) {
        return setStatus({ email: ErrorMessage.getErrorMessage(error.code) });
      }
      router.push(pageIndex.error.somethingWentWrong);
    }
  };

  return { useChangeEmailInitHandler };
};

export default useChangeEmailInit;
