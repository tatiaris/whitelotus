import React from 'react';
import { Text, Divider } from '@geist-ui/react';

/**
 * Footer component
 */
export const Footer: React.FC = () => {
  return (
    <>
      <Divider></Divider>
      <Text small style={{ float: 'right', padding: '0 20px', marginBottom: '20px' }} type="secondary" className={`copyright-statement`}>
        Copyright © 2020 - 2021{' '}
        <a rel="noreferrer" target="_blank" href="https://tatiaris.com">
          Rishabh Tatia
        </a>
      </Text>
    </>
  );
};

export default Footer;