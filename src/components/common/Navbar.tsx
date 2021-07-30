import React from 'react';
import { Button, Row, Link, ButtonDropdown } from '@geist-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Menu } from '@geist-ui/react-icons';
import { navigatePath } from '../Helper';

/**
 * Navbar component
 */
export const Navbar: React.FC = (): React.ReactElement => {
  const [session, loading] = useSession();

  return (
    <>
      <Row className="navbar-row">
        <div className="left-nav-container">
          <Link className="brand-name" href="/" block>Board Games</Link>
          <div className="left-links-container">
            <Link className={false ? "active" : ""} href="/about" block>
              About
            </Link>
          </div>
        </div>
        <div className="right-nav-container">
          {!session && !loading && (
            <Button size="small" auto onClick={() => signIn('auth0')}>
              Sign in
            </Button>
          )}
          {session && (
            <ButtonDropdown size="small" auto>
              <ButtonDropdown.Item main disabled>
                @{session.user.name}
              </ButtonDropdown.Item>
              <ButtonDropdown.Item type="error" onClick={signOut}>
                Sign out
              </ButtonDropdown.Item>
            </ButtonDropdown>
          )}
          <div className="hamburger-nav">
            <ButtonDropdown auto size="small">
              <ButtonDropdown.Item main><Menu /></ButtonDropdown.Item>
              <ButtonDropdown.Item onClick={() => navigatePath("/about")}>About</ButtonDropdown.Item>
            </ButtonDropdown>
          </div>
        </div>
      </Row>
    </>
  );
};

export default Navbar;
