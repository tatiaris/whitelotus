import React from 'react';
import { useState } from 'react';
import BombSquad from '../game/bombsquad/BombSquad';
import { TheMind } from '../game/themind/TheMind';
import { PlayerObj, roomJsonObj } from '../interfaces';
import gameInfo from '../../constants/gameInfo';
import { socket } from '../../../util/socket';
import * as style from '../ui/css/Table.module.css';
import ChatContainer from './ChatContainer';
import Modal from './Modal';
import { navigatePath } from '../Helper';
import ProfileEditForm from './ProfileEditForm';
import PlayersList from './PlayersList';

/**
 * Table component
 */
export interface GameProps {
  room_id: string;
  userInfo: PlayerObj;
  roomInfo: roomJsonObj;
}
export interface TableProps {
  data: GameProps;
}
export const Table: React.FC<TableProps> = (props): React.ReactElement => {
  const { room_id, userInfo, roomInfo } = props.data;
  const [chatVisible, setChatVisible] = useState(false);
  const [playersVisible, setPlayersVisible] = useState(false);
  const [updatingUsername, setUpdatingUsername] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState('');

  let gameComponent = <></>;
  if (roomInfo.gameType === 'bomb-squad') gameComponent = <BombSquad {...props} />;
  else if (roomInfo.gameType === 'the-mind') gameComponent = <TheMind {...props} />;

  return (
    <div className={style['table-area-container']}>
      <div className={style['nav']}>
        <div className={style['game-nav']}>
          <button onClick={() => navigatePath('/')} className="shadow-25">
            Leave
          </button>
          <button onClick={() => setUpdatingUsername(true)} className="shadow-25">
            Edit Profile
          </button>
        </div>
        <div className={style['game-nav']}>
          <button onClick={() => setPlayersVisible(!playersVisible)} className="shadow-25">
            Players
          </button>
          <button onClick={() => setChatVisible(!chatVisible)} className="shadow-25">
            Chat
          </button>
        </div>
      </div>
      {gameComponent}
      <ChatContainer {...props} visible={chatVisible} setVisible={setChatVisible} />
      <PlayersList {...props} visible={playersVisible} setVisible={setPlayersVisible} />
      <Modal visible={updatingUsername} setVisible={setUpdatingUsername} content={<ProfileEditForm room_id={room_id} userInfo={userInfo} setVisible={setUpdatingUsername} />} />
    </div>
  );
};

export default Table;
