import React from 'react';
import Head from 'next/head';

/**
 * Header component
 */
export const Header: React.FC = () => {
  return (
    <Head>
      <title>Board Games</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <meta name="description" content=""></meta>
      <meta name="viewport" content="user-scalable=yes, initial-scale=1, maximum-scale=5, minimum-scale=1, width=device-width" />
      <meta property="og:title" content="Board Games" />
      <meta property="og:site_name" content="Board Games" />
      <meta property="og:url" content="" />
      <meta property="og:description" content="play board games online free" />
      <meta property="og:type" content="profile" />
      <meta httpEquiv="content-language" content="en" />
    </Head>
  );
};

export default Header;
