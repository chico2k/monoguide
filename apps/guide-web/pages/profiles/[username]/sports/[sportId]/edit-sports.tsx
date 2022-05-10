import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import Unauthorized from '../../../../../src/Container/Auth/Unauthorized';
import EditSportForm from '../../../../../src/Container/User/Detail/Sport/EditSport/SportEditForm';
import { useGetSportDetailQuery } from '../../../../../generated/graphql';
import Spinner from '../../../../../src/Components/Spinner';

interface IProps {
  userId: string;
  myUser: boolean;
}

const AddSportPage: NextPage<IProps> = () => {
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

  const { getSportDetail: sport } = data;

  if (user && user.attributes.sub !== sport.user_id) return <Unauthorized />;

  return <EditSportForm userId={user.attributes.sub} sportId={sport.id} level={sport.level} />;
};

export default AddSportPage;
