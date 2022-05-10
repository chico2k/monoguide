import React from 'react';

interface IProps {
  message?: string;
}
const Spinner: React.FC<IProps> = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col">
      <div>
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-8 border-green-900"></div>
        </div>
      </div>
      <div className="flex justify-center mt-4 text-green-600">
        <span>{message ? message : 'Loading...'}</span>
      </div>
    </div>
  </div>
);

export default Spinner;
