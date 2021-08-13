import React, { useEffect, useState } from 'react';
import { socket } from '../../../../util/socket';
import { TableProps } from '../../common/Table';
import * as style from '../../ui/css/TheMind.module.css';

/**
 * TheMind component
 */
interface theMindPublicData {
  level: number;
  totalLevels: number;
  totalCards: number;
  cardsRemaining: number;
  livesRemaining: number;
  cardsPlayedList: Array<number>;
}
interface theMindPrivateData {
  cards: Array<number>;
}
const defaultTheMindPublicData = {
  level: 0,
  totalLevels: 0,
  totalCards: 0,
  cardsRemaining: 0,
  livesRemaining: 0,
  cardsPlayedList: []
};
export const TheMind: React.FC<TableProps> = (props) => {
  const { room_id, userInfo, roomInfo } = props.data;
  const [privateGameData, setPrivateGameData] = useState<theMindPrivateData>({ cards: [] });
  const [publicGameData, setPublicGameData] = useState<theMindPublicData>(defaultTheMindPublicData);

  const gameHasEnded = () => {
    setPublicGameData(defaultTheMindPublicData);
  };

  const publicDataUpdate = (publicData: theMindPublicData) => {
    setPublicGameData(publicData);
    socket.emit('private_data_request', { username: userInfo.username, room_id });
  };

  const playLowestCard = () => {
    socket.emit('player_action', { room_id, username: userInfo.username, actionType: 'play_lowest_card', actionData: {} });
  };

  useEffect(() => {
    socket.on('public_data_update', publicDataUpdate);
    socket.on('private_data_update', setPrivateGameData);
    socket.on('game_has_ended', gameHasEnded);
  }, []);

  if (!roomInfo.inProgress) {
    return userInfo.admin ? (
      <div>
        Please press the <b>start game</b> button to start the game
      </div>
    ) : (
      <div>Please wait for the admin to start the game</div>
    );
  }
  return (
    <div>
      <div>Current Level: {publicGameData.level}</div>
      <div>Total Cards: {publicGameData.totalCards}</div>
      <div>Cards Remaining: {publicGameData.cardsRemaining}</div>
      <div>Lives Remaining: {publicGameData.livesRemaining}</div>
      <div>Cards Played: {publicGameData.cardsPlayedList.join(', ')}</div>
      <div>Your Remaining Card(s): {privateGameData.cards?.join(', ')}</div>
      <div>
        <button disabled={privateGameData.cards.length <= 0} onClick={playLowestCard}>
          play lowest card
        </button>
      </div>
    </div>
  );
};

export default TheMind;
