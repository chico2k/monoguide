import React from 'react';
import Link from 'next/link';
import Spinner from '../../../../Components/Spinner';

import SuccessFeedback from '../../../../Components/Elements/Feedback/success';
import Button from '../../../../Components/Elements/Link/index';
import FailFeedback from '../../../../Components/Elements/Feedback/fails';
import useActivate from '../../Hooks/useActivate';
import { pageIndex } from '../../../../../pages/pageIndex';

interface IProps {
  query: {
    username: string;
    token: string;
  };
}

const ActivateUserComp = ({ query }: IProps) => {
  const {
    status: { success, error },
  } = useActivate({ query });

  if (!success && !error) return <Spinner />;

  if (success)
    return (
      <div data-test="success">
        <SuccessFeedback> Your account has been activated successfully</SuccessFeedback>
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mt-14">
            <Link href={pageIndex.auth.login} passHref>
              <Button primary size={3}>
                Login now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div data-test="fail">
        <FailFeedback> Something went wrong. Try to resend your activation link.</FailFeedback>
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-sm mx-auto mt-14">
            <Link href="/auth/activate/resend">
              <Button secondary size={3}>
                Resend Activation Link
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default ActivateUserComp;
