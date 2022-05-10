import Auth from '@aws-amplify/auth';
import { useRouter } from 'next/router';

interface IProps {
  query: {
    token: string;
    username: string;
  };
}

const useConfirmPassword = ({ query }: IProps) => {
  const router = useRouter();

  const useConfirmPasswordHandler = async ({ password }) => {
    try {
      await Auth.forgotPasswordSubmit(query.username, query.token, password);
      await router.push('/auth/login');
    } catch (error) {
      console.log('err', error);
    }
  };

  return { useConfirmPasswordHandler };
};

export default useConfirmPassword;
