import { useEffect, useState } from 'react';
import Auth from '@aws-amplify/auth';
import router from 'next/router';
import { pageIndex } from '../../../../pages/pageIndex';

interface IProps {
  query: {
    username: string;
    token: string;
  };
}

const useActivate = ({ query }: IProps) => {
  const initialState = {
    error: false,
    success: false,
  };
  const [status, setStatus] = useState(initialState);

  useEffect(() => {
    async function activate() {
      try {
        await Auth.confirmSignUp(query.username, query.token);
        router.push({ pathname: pageIndex.auth.activateConfirm }, undefined, { shallow: true });
        return setStatus({ success: true, error: false });
      } catch (err) {
        console.log('error', err);
        if (err.message === 'User cannot be confirmed. Current status is CONFIRMED') {
          return setStatus({ success: true, error: false });
        }
        router.push(pageIndex.error.somethingWentWrong);
      }
      return setStatus({ success: false, error: true });
    }

    activate();
  }, []);

  return { status };
};

export default useActivate;
