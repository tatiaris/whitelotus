import React from 'react';
import { TableProps } from '../../common/Table';

/**
 * BombSquad component
 */
export const BombSquad: React.FC<TableProps> = (props) => {
  const { room_id, userInfo, roomInfo } = props.data;
  return <div>bomb squad game content</div>;
};

export default BombSquad;
