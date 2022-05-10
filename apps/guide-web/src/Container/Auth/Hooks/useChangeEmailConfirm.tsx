import { useEffect, useState } from 'react';
import Auth from '@aws-amplify/auth';

interface IProps {
  token: string;
}

const useChangeEmailConfirm = ({ token }: IProps) => {
  const initialState = {
    error: false,
    success: false,
  };

  const [status, setStatus] = useState(initialState);

  useEffect(() => {
    async function activate() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.verifyUserAttributeSubmit(user, 'email', token);
        setStatus({ success: true, error: false });
      } catch {
        setStatus({ success: false, error: true });
      }
    }

    activate();
  }, []);
  return { status };
};

export default useChangeEmailConfirm;
