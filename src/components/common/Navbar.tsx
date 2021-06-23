import React from 'react';
import { useRouter } from 'next/router';
import { Button, Row, Link, ButtonDropdown } from '@geist-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Menu } from '@geist-ui/react-icons';
import * as Global from "../Constants";

/**
 * Navbar component
 */

export const Navbar: React.FC = (): React.ReactElement => {
  const [session, loading] = useSession();
  const router = useRouter();
  const initialPath = router.route.split('/')[1];

  const navigatePath = (path) => (location.href = path);

  return (
    <>
      <Row className="navbar-row">
        <div className="left-nav-container">
          <Link className="brand-name" href="/" block>
            {Global.metadata.name}
          </Link>
          <div className="left-links-container">
            {Object.keys(Global.metadata.structure).map((route, i) => {
              const routeData = Global.metadata.structure[route];
              return (
                <Link key={`nav-${i}`} className={(initialPath == route) && "active"} href={routeData.href} block>
                  {routeData.title}
                </Link>
              )
            })}
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
              {Object.keys(Global.metadata.structure).map((route, i) => {
                const routeData = Global.metadata.structure[route];
                return (
                  <ButtonDropdown.Item key={`dropdown-btn-${i}`} onClick={() => navigatePath(routeData.href)}>{routeData.title}</ButtonDropdown.Item>
                )
              })}
            </ButtonDropdown>
          </div>
        </div>
      </Row>
    </>
  );
};

export default Navbar;