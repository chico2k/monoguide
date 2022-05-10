import Auth from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import { pageIndex } from '../../../../pages/pageIndex';

const useChangePassword = () => {
  const router = useRouter();

  const useChangePasswordHandler = async ({ password, re_password, current_password }) => {
    const payload = {
      password,
      re_password,
      current_password,
    };

    try {
      console.log('Payload', payload);
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, current_password, password);
      await Auth.signOut();
      await router.push('/auth/login');
    } catch (error) {
      router.push(pageIndex.error.somethingWentWrong);
    }
  };

  return { useChangePasswordHandler };
};

export default useChangePassword;
