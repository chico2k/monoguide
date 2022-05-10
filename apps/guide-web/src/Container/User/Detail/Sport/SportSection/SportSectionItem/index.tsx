import React from 'react';
import { useGetUserDetailQuery } from '../../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../../lib/Apollo/reactiveVars';
import DeleteSportButton from '../../DeleteSport/DeleteSportButton';
import EditSportButton from '../../EditSport/SportEditButton';

const SportSectionItemList = () => {
  const { username } = activeUserDetail();

  const {
    data: {
      getUserDetail: {
        user: { sport }
      }
    }
  } = useGetUserDetailQuery({
    variables: { username }
  });

  if (sport?.length < 1) return null;

  const sortedSport = sport
    .slice()
    .sort((a, b) =>
      a.level < b.level
        ? 1
        : a.level === b.level
        ? a.sportRef.title > b.sportRef.title
          ? 1
          : -1
        : -1
    );

  const content = sortedSport.map((sportItem) => {
    return (
      <div
        key={sportItem.id}
        className={`bg-white flex-column p-2 rounded-lg group`}
      >
        <div className="grid grid-cols-3">
          <h3 data-test="title" className="text-base font-bold">
            {sportItem.sportRef.title}
          </h3>
          <span data-test="level">Level: {sportItem.level}</span>
          <div className="flex flex-row justify-end">
            <EditSportButton
              data-test="edit-button"
              sportId={sportItem.id}
              level={sportItem.level}
            />
            <DeleteSportButton
              data-test="delete-button"
              sportId={sportItem.id}
              sportRef={sportItem.sportRef}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-3">{content}</div>
    </>
  );
};

export default SportSectionItemList;
