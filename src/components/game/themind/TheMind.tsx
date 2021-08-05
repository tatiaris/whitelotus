import React from 'react';
import { GameContainerProps } from '../../common/GameContainer';
import UsernameContainer from '../../common/UsernameContainer';

/**
 * TheMind component
 */
export const TheMind: React.FC<GameContainerProps> = (props) => {
  const { room_id, username, roomInfo } = props.data;
  return (
    <div>
      game: the mind
      <UsernameContainer data={{ username, room_id }} />
    </div>
  );
};

export default TheMind;
