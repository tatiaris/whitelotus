import React from 'react';
import { Page } from '@geist-ui/react';
import PlayingCard from '../components/game/equipment/PlayingCard';

const Home = (): React.ReactNode => {
  return (
    <Page>
      <PlayingCard data={{ value: "1", suit: "hearts" }} />
    </Page>
  );
};

export default Home;
