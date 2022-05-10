import React, { useEffect } from 'react';
import { NextPage } from 'next';
import RegisterComp from '../../../src/Container/Auth/Register/RegisterComp';
import { Hub, Auth } from 'aws-amplify';
import { awsConfig } from '../../../awsconfig';

Auth.configure(awsConfig.Auth);

const AuthRegister: NextPage = () => {
  useEffect(() => {
    Hub.listen('auth', (data) => {
      const { payload } = data;
      console.log('A new auth event has happened: ', data);
      if (payload.event === 'signIn') {
        console.log('a user has signed in!');
      }
      if (payload.event === 'signOut') {
        console.log('a user has signed out!');
      }
    });
  }, []);
  return <RegisterComp />;
};

export default AuthRegister;
