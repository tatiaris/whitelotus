import React from 'react';
import { useState } from 'react';
import BombSquad from '../game/bombsquad/BombSquad';
import { TheMind } from '../game/themind/TheMind';
import { navigatePath } from '../Helper';
import { PlayerObj, roomJsonObj } from '../interfaces';

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
  const { room_id, roomInfo } = props.data;
  const [gameInProgress, setGameInProgress] = useState(false);

  const startGame = () => {
    setGameInProgress(true);
  }

  const endGame = () => {
    setGameInProgress(false);
  }

  let gameComponent = <></>;
  if (roomInfo.gameType === 'bomb-squad') gameComponent = <BombSquad {...props} />;
  else if (roomInfo.gameType === 'the-mind') gameComponent = <TheMind {...props} />;

  return (
    <div style={{ width: '80%', height: '100%', padding: '1rem' }}>
      <div>game: {roomInfo.gameType}</div>
      <div>
        {gameInProgress ? <button onClick={endGame}>end game</button> : <button onClick={startGame}>start game</button>}
      </div>
      {gameComponent}
    </div>
  );
};

export default GameContainer;
