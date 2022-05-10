import Link from 'next/link';
import React from 'react';
import { pageIndex } from '../../../../pages/pageIndex';
import Button from '../../../Components/Elements/Link';

interface IProps {
  authenticated: boolean;
}

const NavigationJoinButton: React.FC<IProps> = ({ authenticated }) => {
  if (authenticated || typeof authenticated === 'undefined') return null;
  if (!authenticated)
    return (
      <>
        <div className="flex space-x-4">
          <Link href={pageIndex.auth.login}>
            <div className="relative group">
              <Button size={3}>Join now</Button>
            </div>
          </Link>
        </div>
      </>
    );
};

export default NavigationJoinButton;
