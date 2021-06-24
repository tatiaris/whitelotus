import React from 'react';
import { Button, Row, Link, ButtonDropdown } from '@geist-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Menu } from '@geist-ui/react-icons';
import * as constants from "../Constants";
import { getInitialPath, navigatePath } from '../Helper';

/**
 * Navbar component
 */
export const Navbar: React.FC = (): React.ReactElement => {
  const [session, loading] = useSession();
  const initialPath = getInitialPath();

  const navbarLinks = [];
  const navDropdownLinks = [];
  Object.keys(constants.metadata.structure).map((route, i) => {
    const routeData = constants.metadata.structure[route];
    if (routeData.public) {
      navbarLinks.push(<Link key={`nav-${i}`} className={(initialPath == route) && "active"} href={routeData.href} block>{routeData.title}</Link>)
      navDropdownLinks.push(<ButtonDropdown.Item key={`dropdown-btn-${i}`} onClick={() => navigatePath(routeData.href)}>{routeData.title}</ButtonDropdown.Item>)
    }
  })

  return (
    <>
      <Row className="navbar-row">
        <div className="left-nav-container">
          <Link className="brand-name" href="/" block>
            {constants.metadata.name}
          </Link>
          <div className="left-links-container">
            {navbarLinks}
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
              <ButtonDropdown.Item main>
                <Menu />
              </ButtonDropdown.Item>
              {navDropdownLinks}
            </ButtonDropdown>
          </div>
        </div>
      </Row>
    </>
  );
};

export default Navbar;