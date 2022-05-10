import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import Unauthorized from '../../../../../src/Container/Auth/Unauthorized';
import { useGetSportDetailQuery } from '../../../../../generated/graphql';
import Spinner from '../../../../../src/Components/Spinner';
import DeleteSportForm from '../../../../../src/Container/User/Detail/Sport/DeleteSport/DeleteSportForm';

interface IProps {
  userId: string;
  myUser: boolean;
}

const DeleteSportPage: NextPage<IProps> = () => {
  const [user, setUser] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        setUser(undefined);
      });
  }, []);

  const sportId = +router.query.sportId;
  const { data, error, loading } = useGetSportDetailQuery({
    variables: { sportId } as any,
  });

  if (loading) return <Spinner />;
  if (error) return <Unauthorized />;
  if (!data) return <Unauthorized />;

  const { getSportDetail } = data;
  if (user && user.attributes.sub !== getSportDetail.user_id)
    return <Unauthorized />;

  return (
    <DeleteSportForm
      userId={user.attributes.sub}
      sportId={getSportDetail.id}
      sportType={getSportDetail.sport_type}
    />
  );
};

export default DeleteSportPage;
