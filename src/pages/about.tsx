import React from 'react';
import { Page } from '@geist-ui/react';
import { signIn, useSession } from 'next-auth/client';

const Home = (): React.ReactNode => {
  const [session] = useSession();
  return (
    <>
      <Page>About page</Page>
    </>
  );
};

export default Home;
