import React from 'react';
import { GameContainerProps } from '../../common/GameContainer';
import UsernameContainer from '../../common/UsernameContainer';

/**
 * BombSquad component
 */
export const BombSquad: React.FC<GameContainerProps> = (props) => {
  const { room_id, username, roomInfo } = props.data;
  return (
    <div>
      game: bomb squad
      <UsernameContainer data={{ username, room_id }} />
    </div>
  );
};

export default BombSquad;
