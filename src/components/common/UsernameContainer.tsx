import React from 'react';
import { useState } from 'react';
import { socket } from '../../../util/socket';
import { PlayerObj } from '../interfaces';

/**
 * GameContainer component
 */

interface UsernameContainerProps {
  userInfo: PlayerObj;
  room_id: string;
}
interface Props {
  data: UsernameContainerProps
}
export const UsernameContainer: React.FC<Props> = (props): React.ReactElement => {
  const { userInfo, room_id } = props.data;
  const [updatingUsername, setUpdatingUsername] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState('');

  const updateUsername = () => {
    if (updatedUsername.length > 0) {
      socket.emit('update_username', { room_id, username: userInfo.username, newUsername: updatedUsername });
      setUpdatingUsername(false);
    }
  };

  return (
    <div>
      (you) {userInfo.username} <button onClick={() => setUpdatingUsername(!updatingUsername)}>{updatingUsername ? 'cancel' : 'update'}</button>
      {updatingUsername && (
        <div>
          <div>
            <input onChange={(e) => setUpdatedUsername(e.target.value.trim())} type="text" name="username" placeholder="readyPlayerOne" />
          </div>
          <button onClick={updateUsername}>update</button>
        </div>
      )}
    </div>
  );
};

export default UsernameContainer;
