import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { socket } from '../../../util/socket';

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
}
 interface GameProps {
  room_id: string;
  username: string;
  roomInfo: roomJsonObj;
}
interface Props {
  data: GameProps;
}
export const GameContainer: React.FC<Props> = (props): React.ReactElement => {
  const { room_id, username, roomInfo } = props.data;
  const [updatingUsername, setUpdatingUsername] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState('');

  const updateUsername = () => {
    socket.emit('update_username', { room_id, username, newUsername: updatedUsername })
    setUpdatingUsername(false);
  }

  return (
    <div style={{ width: "80%", height: "100%", padding: "1rem" }}>
      room: {room_id}
      <br />
      total players: {roomInfo.totalPlayers}
      <br />
      players: {roomInfo.players.map((p, i) => <span>{`${i == 0 ? "" : `, `}${p.username}`}</span>)}
      <br />
      username: {username}
      <button onClick={() => setUpdatingUsername(!updatingUsername)}>{updatingUsername ? "cancel" : "update"}</button>
      {updatingUsername && <div>
        <div>
          <input onChange={(e) => setUpdatedUsername(e.target.value)} type="text" name="username" placeholder="readyPlayerOne" />
        </div>
        <button onClick={updateUsername}>update</button>
      </div>}
    </div>
  );
};

export default GameContainer;
