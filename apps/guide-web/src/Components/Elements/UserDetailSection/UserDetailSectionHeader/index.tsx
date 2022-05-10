import React from 'react';

const UserDetailSectionHeader: React.FC = ({ children }) => {
  return <div className="flex flex-row justify-between  items-start mb-3">{children}</div>;
};

export default UserDetailSectionHeader;
