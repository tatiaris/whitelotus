import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { navigatePath } from '../Helper';

/**
 * Navbar component
 */
export const Navbar: React.FC = (): React.ReactElement => {
  const [session, loading] = useSession();

  return (
    <>navbar</>
  );
};

export default Navbar;
