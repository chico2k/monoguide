import React from 'react';
import FailFeedback from '../../src/Components/Elements/Feedback/fails';

const ErrorPage = () => {
  return (
    <div data-test="fail">
      <FailFeedback> Something went wrong. Please try again later.</FailFeedback>
    </div>
  );
};

export default ErrorPage;
