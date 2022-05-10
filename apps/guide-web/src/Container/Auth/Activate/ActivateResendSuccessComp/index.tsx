import React from 'react';
import SuccessFeedback from '../../../../Components/Elements/Feedback/success';

const ActivateResendSuccessComp: React.FC = () => {
  return (
    <SuccessFeedback>
      We will be checking for an unverified account with the mentioned Email. Please check your Mail for further
      instructions.
    </SuccessFeedback>
  );
};

export default ActivateResendSuccessComp;
