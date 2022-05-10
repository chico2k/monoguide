import React, { useState, useEffect } from 'react';
import Router from 'next/router';

const Unauthorized: React.FC = () => {
  const initialState = 3000;

  const [seconds, setSeconds] = useState(initialState);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1000);
      } else if (seconds === 0) {
        setRedirect(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  if (redirect === true) {
    Router.push('/');
    return null;
  }

  return (
    <>
      <div> You are not authorized for this page! </div>
      <span> Redirect in {seconds / 1000} </span>
    </>
  );
};

export default Unauthorized;
