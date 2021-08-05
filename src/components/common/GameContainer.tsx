import React from 'react';
import BombSquad from '../game/bombsquad/BombSquad';
import { TheMind } from '../game/themind/TheMind';
import { navigatePath } from '../Helper';

/**
 * GameContainer component
 */
interface PlayerObj {
  username: string;
  admin: boolean;
}
export interface roomJsonObj {
  totalPlayers: number;
  players: Array<PlayerObj>;
  gameType: string;
}
interface GameProps {
  room_id: string;
  username: string;
  roomInfo: roomJsonObj;
}
export interface GameContainerProps {
  data: GameProps;
}
export const GameContainer: React.FC<GameContainerProps> = (props): React.ReactElement => {
  const { room_id, username, roomInfo } = props.data;

  let gameComponent = <></>;
  if (roomInfo.gameType === 'bomb-squad') gameComponent = <BombSquad {...props} />;
  else if (roomInfo.gameType === 'the-mind') gameComponent = <TheMind {...props} />;

  return (
    <div style={{ width: '80%', height: '100%', padding: '1rem' }}>
      room: {room_id} <button onClick={() => navigatePath('/')}>leave</button>
      <br />
      {gameComponent}
    </div>
  );
};

export default GameContainer;
