import React from 'react';
import { Mheader } from '../components/common/Mheader';
import { Mnavbar } from '../components/common/Mnavbar';
import { MFooter } from '../components/common/MFooter';
import { Page } from '@geist-ui/react';
import { signIn, useSession } from 'next-auth/client';

const Home = (): React.ReactNode => {
  const [session] = useSession();
  return (
    <>
      <Mheader title="Home" />
      <Mnavbar theme="light" page="Home" />
      <Page>
        Home Page
      </Page>
      <MFooter />
    </>
  );
};

export default Home;
