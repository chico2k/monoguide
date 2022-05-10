import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { useSignUp } from '@clerk/nextjs';
import { redirect } from 'next/dist/server/api-utils';
import { redirectURL } from '../../../lib/HOC/redirectHOC';

interface IValues {
  email: string;
  password: string;
  name: string;
}

const useRegister = () => {
  const router = useRouter();

  const { signUp } = useSignUp();

  const useRegisterHandler = async ({ email, password, name }: IValues) => {
    try {
      signUp.create({
        firstName: name,
        lastName: name,
        emailAddress: email,
        password
      });

      const resp = await signUp.prepareVerification({
        strategy: 'email_link',
        redirectUrl: 'http://localhost:3002/auth/register/success'
      });

      console.log('resp', resp);

      // console.log('register', user);
      return router.push('/auth/register/success');
    } catch (error) {
      console.log('error', error.errors);
      if (error.code === 'UsernameExistsException')
        return router.push('/auth/register/success');
      return router.push('/auth/register/success');
    }
  };

  return { useRegisterHandler };
};

export default useRegister;
