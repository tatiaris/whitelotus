import React from 'react';
import { signIn } from 'next-auth/client';
import { Mnavbar } from '../common/Mnavbar';
import { Button, Note, Page, Row, Col, Snippet, Textarea } from '@geist-ui/react';

/**
 * Error Page component
 */
export const Errpage: React.FC = () => {
  return (
    <>
      <Mnavbar theme="light" page="err" />
      <Page style={{ padding: '50px' }}>
        <Note type="error">You need to be logged in to access the design page. Please Sign in / Sign up by clicking the button below.</Note>
        <br />
        <Button onClick={() => signIn('auth0')}>Sign In</Button>
      </Page>
    </>
  );
};
