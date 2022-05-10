import React from 'react';
import UserListCard from './UserListCard';

const UserListContainer = () => {
  return <div className="grid grid-cols-1 py-4 px-2">{UserListCard()}</div>;
};

export default UserListContainer;
