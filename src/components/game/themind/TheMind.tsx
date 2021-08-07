import React from 'react';
import { GameContainerProps } from '../../common/GameContainer';

/**
 * TheMind component
 */
export const TheMind: React.FC<GameContainerProps> = (props) => {
  const { room_id, userInfo, roomInfo } = props.data;
  return (
    <div>The Mind game content</div>
  );
};

export default TheMind;
