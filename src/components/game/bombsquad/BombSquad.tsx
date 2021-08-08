import React from 'react';
import { GameContainerProps } from '../../common/GameContainer';

/**
 * BombSquad component
 */
export const BombSquad: React.FC<GameContainerProps> = (props) => {
  const { room_id, userInfo, roomInfo } = props.data;
  return <div>bomb squad game content</div>;
};

export default BombSquad;
