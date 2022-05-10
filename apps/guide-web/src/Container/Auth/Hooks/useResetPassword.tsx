import { useRouter } from 'next/router';
import { useState } from 'react';
import { useClerk, useMagicLink, useSignIn } from '@clerk/nextjs';

interface IValues {
  email: string;
}

const useResetPassword = () => {
  const [initiated, setInitated] = useState(false);
  const [expired, setExpired] = useState(false);
  const [verified, setVerified] = useState(false);

  console.log('expired', expired);
  console.log('verified', verified);

  const router = useRouter();
  const { setSession } = useClerk();
  const { signIn } = useSignIn();
  const { startMagicLinkFlow } = useMagicLink(signIn);

  const useResetPasswordHandler = async ({ email }: IValues) => {
    try {
      const si = await signIn.create({ identifier: email });

      const supportedFirstFactors = si.supportedFirstFactors.find(
        (ff) => ff.strategy === 'email_link' && ff.safeIdentifier === email
      );

      if (supportedFirstFactors.strategy !== 'email_link') return;
      console.log('here 1?');

      console.log('emailAddressId', supportedFirstFactors.emailAddressId);

      setInitated(true);
      const res = await startMagicLinkFlow({
        emailAddressId: supportedFirstFactors.emailAddressId,
        redirectUrl: 'http://localhost:3002/custom'
      });

      console.log('res', res);

      const verification = res.firstFactorVerification;

      if (verification.verifiedFromTheSameClient()) {
        console.log('verifiedFromTheSameClient');
        setVerified(true);
        // If you're handling the verification result from
        // another route/component, you should return here.
        // See the <Verification/> component as an
        // example below.
        // If you want to complete the flow on this tab,
        // don't return. Simply check the sign in status.
        setSession(res.createdSessionId);
        return;
      } else if (verification.status === 'expired') {
        setExpired(true);
      }
      if (res.status === 'complete') {
        console.log('completed');
        // Sign in is complete, we have a session.
        // Navigate to the after sign in URL.
        setSession(res.createdSessionId, () => router.push('/'));
        return;
      }
    } catch (error) {
      console.log('error', JSON.stringify(error));
      if (error.code === 'UserNotFoundException')
        await router.push('/auth/reset-password/success');
    }
  };

  return { useResetPasswordHandler, expired, verified, initiated };
};

export default useResetPassword;
