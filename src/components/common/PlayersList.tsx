import React from 'react';
import { socket } from '../../../util/socket';
import { GameProps } from './GameContainer';
import UsernameContainer from './UsernameContainer';

/**
 * PlayersList component
 */
export interface PlayersListProps {
  data: GameProps;
}
export const PlayersList: React.FC<PlayersListProps> = (props): React.ReactElement => {
  const { room_id, roomInfo, userInfo } = props.data;

  const kickPlayer = (username: string) => {
    console.log(`kicking player ${username}`);
    socket.emit('kick_player', { room_id, username });
  };

  return (
    <div style={{ width: '100%' }}>
      players list:
      {Object.keys(roomInfo.players).map((username, i) => {
        if (username == userInfo.username) return <UsernameContainer key={`player-in-room-${i}`} data={{ room_id, userInfo }} />;
        if (userInfo.admin)
          return (
            <div key={`player-in-room-${i}`}>
              {username} <button onClick={() => kickPlayer(username)}>kick</button>
            </div>
          );
        return <div key={`player-in-room-${i}`}>{username}</div>;
      })}
    </div>
  );
};

export default PlayersList;
