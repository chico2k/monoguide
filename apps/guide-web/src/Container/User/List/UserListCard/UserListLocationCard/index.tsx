import React from 'react';
import { UserListLocationFragment } from '../../../../../../generated/graphql';

interface IProps {
  location: UserListLocationFragment;
}

const UserListLocationCard: React.FC<IProps> = ({ location }) => {
  if (location)
    return <span className="text-xs text-gray-500">{location.placeName}</span>;

  return <span className="text-xs text-gray-500"> No Location</span>;
};

export default UserListLocationCard;
