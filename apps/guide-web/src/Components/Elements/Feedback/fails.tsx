import { XCircleIcon } from '@heroicons/react/outline';
import React from 'react';

const FailFeedback = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mt-14">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{children}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailFeedback;
