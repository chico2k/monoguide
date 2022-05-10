import { UserProfile } from '@clerk/nextjs';
import { useUser, WithUser, useSession } from '@clerk/nextjs/';

const UserProfilePage = () => {
  const user = useUser();
  const session = useSession();
  console.log('user', user);
  console.log('session', session);

  const getToken = async () => {
    const tkn = await session.getToken({ template: 'default' });
    console.log('tkn', tkn);
    console.log('sessionId', session.id);
  };

  return (
    <>
      <button onClick={getToken}>Get Token</button>
      <UserProfile path='/user' routing='path' />
    </>
  );
};

export default UserProfilePage;
