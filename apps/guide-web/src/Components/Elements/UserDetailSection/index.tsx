import React from 'react';

const UserDetailSection: React.FC = ({ children }) => {
  return (
    <div className='w-full bg-gray-100 overflow-hidden rounded-md p-6'>
      {children}
    </div>
  );
};

export default UserDetailSection;
