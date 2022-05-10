import React from 'react';
import AuthChangeEmailInitForm from '../../ChangeEmail/Init/ChangeEmailInitForm';
import AuthChangePasswordForm from '../../ChangePassword/ChangePasswordForm';
import { UserProfile } from '@clerk/nextjs';

const CockpitComp: React.FC = () => {
  return (
    <div data-test="cockpit">
      <UserProfile />
    </div>
  );
};

export default CockpitComp;
