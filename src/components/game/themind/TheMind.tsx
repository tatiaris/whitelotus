import React, { useEffect, useState } from 'react';
import { socket } from '../../../../util/socket';
import { GameContainerProps } from '../../common/GameContainer';

/**
 * TheMind component
 */
interface theMindPublicData {
  level: number;
  totalCards: number;
  cardsRemaining: number;
  livesRemaining: number;
  cardsPlayedList: Array<number>;
}
interface theMindPrivateData {
  cards: Array<number>;
}
export const TheMind: React.FC<GameContainerProps> = (props) => {
  const { room_id, userInfo, roomInfo } = props.data;
  const [privateGameData, setPrivateGameData] = useState<theMindPrivateData>({
    cards: []
  });
  const [publicGameData, setPublicGameData] = useState<theMindPublicData>({
    level: 0,
    totalCards: 0,
    cardsRemaining: 0,
    livesRemaining: 0,
    cardsPlayedList: []
  });

  const gameHasStarted = () => {
    socket.emit('private_data_request');
  };

  useEffect(() => {
    socket.on('public_data_update', (d) => setPublicGameData(d));
    socket.on('private_data_update', (d) => setPrivateGameData(d));
    socket.on('game_has_started', gameHasStarted);
  }, []);

  if (!roomInfo.inProgress)
    return (
      <div>
        Please press the <b>start game</b> button to start the game
      </div>
    );
  return (
    <div>
      <div>Current Level: {publicGameData.level}</div>
      <div>Total Cards: {publicGameData.totalCards}</div>
      <div>Cards Remaining: {publicGameData.cardsRemaining}</div>
      <div>Lives Remaining: {publicGameData.livesRemaining}</div>
      <div>Cards Played: {publicGameData.cardsPlayedList.join(', ')}</div>
      <div>Your Cards: {privateGameData.cards.join(', ')}</div>
      <div>
        <button>play lowest card</button>
      </div>
    </div>
  );
};

export default TheMind;
