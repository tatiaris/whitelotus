import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as constants from '../Constants';

/**
 * Header component
 */
export const Header: React.FC = () => {
  const router = useRouter();
  const initialPath = router.route.split('/')[1];
  const routeMetaData = constants.metadata.structure[initialPath];

  return (
    <Head>
      <title>
        {constants.metadata.abbrName} | {routeMetaData.title}
      </title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <meta name="description" content={routeMetaData.description}></meta>
      <meta name="viewport" content="user-scalable=yes, initial-scale=1, maximum-scale=5, minimum-scale=1, width=device-width" />
      <meta property="og:title" content={`${constants.metadata.name} | ${routeMetaData.title}`} />
      <meta property="og:site_name" content={`${constants.metadata.name}`} />
      <meta property="og:url" content={`${constants.metadata.baseURL}`} />
      <meta property="og:description" content={routeMetaData.description} />
      <meta property="og:type" content="profile" />
      <meta httpEquiv="content-language" content="en" />
    </Head>
  );
};

export default Header;
