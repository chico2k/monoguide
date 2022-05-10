import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { getRedirectSettings } from '../../../lib/HOC/redirectHOC';
import { FormikHelpers } from 'formik';
import { useSignIn } from '@clerk/nextjs';
import { useClerk, useSession } from '@clerk/nextjs';
import { useSessionContext } from '.pnpm/@clerk+clerk-react@2.12.7_react@18.1.0/node_modules/@clerk/clerk-react/dist/contexts/SessionContext';

interface IValues {
  email: string;
  password: string;
}

const useLogin = ({ query }: { query: { redirect: string } }) => {
  const { signIn } = useSignIn();

  const clerk = useClerk();

  const router = useRouter();

  const useLoginHandler = async (
    { email, password }: IValues,
    { setStatus }: FormikHelpers<IValues>
  ) => {
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password
      });
      console.log('signInAttempt', signInAttempt);

      clerk.setSession(signInAttempt.createdSessionId, () =>
        console.log('done!')
      );

      // await Auth.signIn(email, password);
      // await Auth.currentSession();
      // const { url, as } = getRedirectSettings(query);
      // router.push(url, as);
    } catch (error) {
      console.log('error', JSON.stringify(error));
      setStatus({ email: 'Incorrect username or password.' });
    }
  };

  return { useLoginHandler };
};

export default useLogin;
