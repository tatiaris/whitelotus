import React from 'react';
import { useState } from 'react';
import { socket } from '../../../util/socket';
import { PlayerObj } from '../interfaces';
import * as style from '../ui/css/Forms.module.css';

/**
 * ProfileEditForm component
 */

interface ProfileEditFormProps {
  userInfo: PlayerObj;
  room_id: string;
  setVisible: CallableFunction;
}
export const ProfileEditForm: React.FC<ProfileEditFormProps> = (props): React.ReactElement => {
  const { userInfo, room_id, setVisible } = props;
  const [updatedUsername, setUpdatedUsername] = useState('');

  const updateUsername = (e) => {
    e.preventDefault();
    if (updatedUsername.length > 0) {
      setVisible(false);
      socket.emit('update_username', { room_id, username: userInfo.username, newUsername: updatedUsername });
      setUpdatedUsername('');
      (document.getElementById('player-input') as HTMLInputElement).value = '';
    }
  };

  return (
    <form onSubmit={updateUsername} className={style['form-container']}>
      <div>
        <h2>Current Username: {userInfo.username}</h2>
        <br />
      </div>
      <div>
        <input onChange={(e) => setUpdatedUsername(e.target.value.trim())} type="text" name="playername" id="player-input" placeholder="readyPlayerOne" />
      </div>
      <button type="submit">UPDATE</button>
    </form>
  );
};

export default ProfileEditForm;
