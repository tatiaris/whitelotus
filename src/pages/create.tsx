import React from 'react';
import { Page } from '@geist-ui/react';
import { useSession } from 'next-auth/client';
import CreateItemForm from '../components/forms/CreateItem';

const Create = (): React.ReactNode => {
  const [session] = useSession();
  return (
    <Page>
      <CreateItemForm />
    </Page>
  );
};

export default Create;
