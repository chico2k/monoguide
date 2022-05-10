import React from 'react';
import { useGetUserDetailQuery } from '../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';

const LocationNotAdded = () => {
  const { username } = activeUserDetail();

  const { data } = useGetUserDetailQuery({
    variables: { username },
  });

  const {
    getUserDetail: {
      user: { location },
    },
  } = data;

  if (location) return null;
  return <div>No Location added</div>;
};

export default LocationNotAdded;
