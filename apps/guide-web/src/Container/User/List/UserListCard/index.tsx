import { useRouter } from 'next/router';
import React from 'react';
import { useGetUserListQuery } from '../../../../../generated/graphql';
import UserListLocationCard from './UserListLocationCard';
import UserListCardAvatar from './Avatar';
import UserListCardReview from './Review';

const UserListCard = () => {
  const router = useRouter();

  const { data } = useGetUserListQuery();

  const {
    getUserList: {
      hits: { hits }
    }
  } = data;

  return hits.map((user) => {
    return (
      <div
        className="shadow-sm bg-gray-100 px-4 py-2 cursor-pointer  flex rounded hover:bg-gray-200 items-center"
        onClick={() => router.push(`/profiles/${user._source.username}`)}
        key={user._source.id}
      >
        <div className="mr-5 flex items-center align-middle">
          <UserListCardAvatar avatar={user._source.avatar} />
        </div>

        <div className="flex-auto flex-col">
          <div className="flex justify-between items-center ">
            <div className=" flex flex-col justify-start">
              <span className="font-semibold">{user._source.firstName}</span>
              <span className="font-semibold">{user._source.lastName}</span>
              <UserListLocationCard location={user._source.location} />
            </div>
            <UserListCardReview reviewMeta={user._source.reviewMeta} />
          </div>
        </div>
      </div>
    );
  });
};

export default UserListCard;
