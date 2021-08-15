import React from 'react';
import { socket } from '../../../util/socket';
import { GameProps } from './Table';
import * as style from '../ui/css/PlayersContainer.module.css';

/**
 * PlayersList component
 */
export interface PlayersListProps {
  data: GameProps;
  visible: boolean;
  setVisible: CallableFunction;
}
export const PlayersList: React.FC<PlayersListProps> = (props): React.ReactElement => {
  const { room_id, roomInfo, userInfo } = props.data;

  const kickPlayer = (username: string) => {
    socket.emit('kick_player', { room_id, username });
  };

  const playerContainerClass = props.visible ? `players-container-visible` : 'players-container';
  return (
    <div className={style[playerContainerClass] + " shadow-25"}>
      <div style={{ width: '100%' }}>
        players list:
        {Object.keys(roomInfo.players).map((username, i) => {
          if (userInfo.admin)
            return (
              <div key={`player-in-room-${i}`}>
                {username} {!roomInfo.inProgress ? <button onClick={() => kickPlayer(username)}>kick</button> : <></>}
              </div>
            );
          return <div key={`player-in-room-${i}`}>{username}</div>;
        })}
      </div>
    </div>
  );
};

export default PlayersList;
