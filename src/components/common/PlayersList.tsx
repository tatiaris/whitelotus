import React from 'react';
import { socket } from '../../../util/socket';
import { GameProps } from './Table';
import * as style from '../ui/css/PlayersList.module.css';
import ProfilePic from './ProfilePic';

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

  const kickUser = (username: string) => {
    socket.emit('kick_user', { room_id, username });
  };

  const playerContainerClass = props.visible ? `players-container-visible` : 'players-container';
  return (
    <div className={style[playerContainerClass] + " shadow-25"}>
      <div className={style['title-container']}>PLAYERS</div>
      {Object.keys(roomInfo.players).length <= 0 ? <div className={style['label']}>No Players</div> : <></> }
      <div className={style["players"]}>
        {Object.keys(roomInfo.players).map((username, i) => (
          <div key={`player-list-${i}`} className={style['player']}>
            <ProfilePic userInfo={roomInfo.players[username]} config={{ width: 50, height: 50, rows: 6 }} />
            <div className={style['details-container']}>
              <div>
                {username === userInfo.username ? '(you) ' : ''}
                <span className={style['player-name']}>{username}</span>
              </div>
              <div className={style['admin-btns-container']}>
                {(!roomInfo.inProgress && userInfo.username == roomInfo.currentAdmin && username !== userInfo.username)
                  ? <button className={style['kick-btn'] + " shadow-25"} onClick={() => kickUser(username)}>kick</button>
                  : <></>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={style['title-container']}>SPECTATORS</div>
      {Object.keys(roomInfo.spectators).length <= 0 ? <div  className={style['label']}>No Spectators</div> : <></> }
      <div className={style["players"]}>
        {Object.keys(roomInfo.spectators).map((username, i) => (
          <div key={`spec-list-${i}`} className={style['player']}>
            <ProfilePic userInfo={roomInfo.players[username]} config={{ width: 50, height: 50, rows: 6 }} />
            <div className={style['details-container']}>
              <div>
                {username === userInfo.username ? '(you) ' : ''}
                <span className={style['player-name']}>{username}</span>
              </div>
              <div className={style['admin-btns-container']}>
                {(!roomInfo.inProgress && userInfo.username == roomInfo.currentAdmin && username !== userInfo.username)
                  ? <button className={style['kick-btn'] + " shadow-25"} onClick={() => kickUser(username)}>kick</button>
                  : <></>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersList;
