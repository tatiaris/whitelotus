import React from 'react';
import { MnavbarProps } from '../../interfaces';
import PropTypes from 'prop-types';
import { Button, Row, Link, ButtonDropdown } from '@geist-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Menu } from '@geist-ui/react-icons';

/**
 * Mnavbar component
 */

export const Mnavbar: React.FC<MnavbarProps> = (props): React.ReactElement => {
  const [session, loading] = useSession();

  const pageType = {
    Home: '',
    Browse: '',
    Search: '',
    Other: ''
  };

  if (props.page in pageType) pageType[props.page] = 'active';

  const navigatePath = (path) => (location.href = path);

  return (
    <>
      <Row className="navbar-row">
        <div className="left-nav-container">
          <Link className="brand-name" href="/" block>
            RESUVILLE
          </Link>
          <div className="left-links-container">
            <Link className={pageType['Home']} href="/" block>
              Home
            </Link>
            <Link className={pageType['Browse']} href="/browse" block>
              Browse
            </Link>
            <Link className={pageType['Search']} href="/search" block>
              Search
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
              <ButtonDropdown.Item onClick={() => navigatePath('/profile')}>Profile</ButtonDropdown.Item>
              <ButtonDropdown.Item type="error" onClick={signOut}>
                Sign out
              </ButtonDropdown.Item>
            </ButtonDropdown>
          )}
          <div className="hamburger-nav">
            {/* <Button auto size="small" icon={<Menu/>}></Button> */}
            <ButtonDropdown auto size="small">
              <ButtonDropdown.Item main>
                <Menu />
              </ButtonDropdown.Item>
              <ButtonDropdown.Item onClick={() => navigatePath('/')}>Home</ButtonDropdown.Item>
              <ButtonDropdown.Item onClick={() => navigatePath('/browse')}>Browse</ButtonDropdown.Item>
              <ButtonDropdown.Item onClick={() => navigatePath('/search')}>Search</ButtonDropdown.Item>
            </ButtonDropdown>
          </div>
        </div>
      </Row>
    </>
  );
};

Mnavbar.propTypes = {
  theme: PropTypes.any.isRequired,
  page: PropTypes.any.isRequired
};
