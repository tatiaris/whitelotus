import React from 'react';
import { useState } from 'react';
import BombSquad from '../game/bombsquad/BombSquad';
import { TheMind } from '../game/themind/TheMind';
import { PlayerObj, roomJsonObj } from '../interfaces';
import gameInfo from '../../constants/gameInfo';
import { socket } from '../../../util/socket';

/**
 * GameContainer component
 */
export interface GameProps {
  room_id: string;
  userInfo: PlayerObj;
  roomInfo: roomJsonObj;
}
export interface GameContainerProps {
  data: GameProps;
}
export const GameContainer: React.FC<GameContainerProps> = (props): React.ReactElement => {
  const { room_id, userInfo, roomInfo } = props.data;
  const [gameInProgress, setGameInProgress] = useState(false);

  const openGameInfoModal = () => {
    console.log(`${roomInfo.gameType} rules:\n\n${gameInfo[roomInfo.gameType].rules}`);
  };

  const startGame = () => {
    socket.emit('start_game', { room_id });
    setGameInProgress(true);
  };

  const endGame = () => {
    socket.emit('end_game', { room_id });
    setGameInProgress(false);
  };

  let gameComponent = <></>;
  if (roomInfo.gameType === 'bomb-squad') gameComponent = <BombSquad {...props} />;
  else if (roomInfo.gameType === 'the-mind') gameComponent = <TheMind {...props} />;

  return (
    <div style={{ width: '80%', height: '100%', padding: '1rem' }}>
      <div>
        game: {roomInfo.gameType} <button onClick={openGameInfoModal}>info</button>
      </div>
      {userInfo.admin ? <div>{gameInProgress ? <button onClick={endGame}>end game</button> : <button onClick={startGame}>start game</button>}</div> : <></>}
      {gameComponent}
    </div>
  );
};

export default GameContainer;
