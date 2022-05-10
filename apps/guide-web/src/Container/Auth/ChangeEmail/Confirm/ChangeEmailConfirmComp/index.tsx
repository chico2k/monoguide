import React from 'react';
import Link from 'next/link';

import Spinner from '../../../../../Components/Spinner/';
import useChangeEmailConfirm from '../../../Hooks/useChangeEmailConfirm';
import SuccessFeedback from '../../../../../Components/Elements/Feedback/success';
import { Button } from '../../../../../Components/Elements/Form/Button/style';
import { pageIndex } from '../../../../../../pages/pageIndex';
import FailFeedback from '../../../../../Components/Elements/Feedback/fails';

interface Props {
  token: string;
}

const ChangeEmailComp = ({ token }: Props) => {
  const {
    status: { success, error },
  } = useChangeEmailConfirm({ token });

  if (!success || !error) return <Spinner />;

  if (success)
    return (
      <div data-test="success">
        <SuccessFeedback> Your Email has been changed successfully</SuccessFeedback>
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
        <FailFeedback> Something went wrong</FailFeedback>
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
};

export default ChangeEmailComp;
