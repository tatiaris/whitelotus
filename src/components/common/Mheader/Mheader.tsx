import React from 'react';
import Head from 'next/head';
import { MheaderProps } from '../../interfaces';
import PropTypes from 'prop-types';

/**
 * Mheader component
 */
export const Mheader: React.FC<MheaderProps> = (props) => {
  const pageDescriptions = {
    Home: "Create beautiful resumes that capture the attention of hiring managers with Resuville's easy to use Resume Builder. Just enter your information to start!",
    Browse: 'Browse through the several unique resume templates available on Resuville.',
    Profile: 'View your profile, your saved data and settings on Resuville.',
    Templates: 'Modify and use our unique resume templates for free.',
    Search: 'Search through all our templates through tags.'
  };
  const titleDescriptions = {
    Home: 'Free & Easy Resume Building Tool',
    Browse: 'Browse',
    Profile: 'Profile',
    Search: 'Search',
    Templates: 'Templates'
  };
  return (
    <Head>
      <title>Resuville | {titleDescriptions[props.title]}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <meta name="description" content={pageDescriptions[props.title]}></meta>
      <meta name="viewport" content="user-scalable=yes, initial-scale=1, maximum-scale=5, minimum-scale=1, width=device-width" />
      <meta property="og:title" content={`Resuville | ${titleDescriptions[props.title]}`} />
      <meta property="og:site_name" content="Resuville" />
      <meta property="og:url" content="resuville.com" />
      <meta property="og:description" content={pageDescriptions[props.title]} />
      <meta property="og:type" content="profile" />
      <meta httpEquiv="content-language" content="en" />
    </Head>
  );
};

Mheader.propTypes = {
  title: PropTypes.string.isRequired
};
