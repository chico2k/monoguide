import React from 'react';
import { useGetUserDetailQuery } from '../../../../../../generated/graphql';
import { activeUserDetail } from '../../../../../lib/Apollo/reactiveVars';

const LocationDetail = () => {
  const { username } = activeUserDetail();

  const { data } = useGetUserDetailQuery({
    variables: { username },
  });

  const {
    getUserDetail: {
      user: { location },
    },
  } = data;

  if (!location) return null;

  return (
    <div>
      <div>Country: {location.country_text}</div>
      <div>Region: {location.region_text}</div>
      <div>Place: {location.text}</div>
    </div>
  );
};

export default LocationDetail;
