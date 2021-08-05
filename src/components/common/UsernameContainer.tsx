import React from 'react';
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
  gameType: string;
}
interface UsernameContainerProps {
  room_id: string;
  username: string;
}
interface Props {
  data: UsernameContainerProps;
}
export const UsernameContainer: React.FC<Props> = (props): React.ReactElement => {
  const { room_id, username } = props.data;
  const [updatingUsername, setUpdatingUsername] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState('');

  const updateUsername = () => {
    socket.emit('update_username', { room_id, username, newUsername: updatedUsername });
    setUpdatingUsername(false);
  };

  return (
    <div>
      username: {username} <button onClick={() => setUpdatingUsername(!updatingUsername)}>{updatingUsername ? 'cancel' : 'update'}</button>
      {updatingUsername && (
        <div>
          <div>
            <input onChange={(e) => setUpdatedUsername(e.target.value)} type="text" name="username" placeholder="readyPlayerOne" />
          </div>
          <button onClick={updateUsername}>update</button>
        </div>
      )}
    </div>
  );
};

export default UsernameContainer;
