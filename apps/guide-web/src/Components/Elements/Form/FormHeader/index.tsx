import React from 'react';

const FormHeader: React.FC = ({ children }) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        className="mx-auto h-12 w-auto text-green-600"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      {children}
    </div>
  );
};

export default FormHeader;
