import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import AddSportForm from '../../../../src/Container/User/Detail/Sport/AddSport/AddSportForm';
import Unauthorized from '../../../../src/Container/Auth/Unauthorized';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

interface IProps {
  userId: string;
  myUser: boolean;
}

const AddSportPage: NextPage<IProps> = () => {
  const [myUser, setMyUser] = useState(false);

  const router = useRouter();

  const { userId } = router.query;
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        if (user.attributes.sub === userId) return setMyUser(true);
        setMyUser(false);
      })
      .catch(() => {
        setMyUser(false);
      });
  }, []);

  if (!userId) {
    return <div> Loading</div>;
  }
  if (!myUser) {
    return <Unauthorized />;
  }
  return <AddSportForm userId={userId as string} />;
};

export default AddSportPage;
