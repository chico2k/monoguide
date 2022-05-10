import { FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import Auth from '@aws-amplify/auth';

interface IValues {
  email: string;
}

const useResendActivation = () => {
  const router = useRouter();

  const useResendActivationHandler = async ({ email }: IValues, { setStatus }: FormikHelpers<IValues>) => {
    try {
      await Auth.resendSignUp(email);
      await router.push('/auth/activate/resend/success');
    } catch (error) {
      setStatus({ email: "We couldn't find an unverified account with your email." });
    }
  };
  return { useResendActivationHandler };
};

export default useResendActivation;
