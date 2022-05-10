import Header from './Header';
import { useUser, WithUser } from '@clerk/nextjs/';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
