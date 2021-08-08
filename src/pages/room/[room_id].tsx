import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { socket } from '../../../util/socket';
import GameContainer from '../../components/common/GameContainer';
import ChatContainer from '../../components/common/ChatContainer';
import { navigatePath } from '../../components/Helper';
import { joiningData, PlayerObj, roomJsonObj } from '../../components/interfaces';

/**
 * Room Page
 */

export const Room = () => {
  const router = useRouter();
  const { room_id } = router.query;
  const [roomFound, setRoomFound] = useState(false);
  const [userInfo, setUserInfo] = useState<PlayerObj>({
    username: '',
    picString: '',
    admin: false
  });
  const [roomInfo, setRoomInfo] = useState<roomJsonObj>({
    gameType: 'none',
    totalPlayers: 1,
    players: {},
    spectators: {},
    inProgress: false
  });

  const joinRoom = (param: joiningData) => {
    setRoomFound(true);
    setUserInfo(param.userInfo);
    setRoomInfo((roomInfo) => ({ ...roomInfo, gameType: param.gameType }));
  };

  const assignUsername = (assignedUsername: string) => {
    setUserInfo((userInfo) => {
      return { ...userInfo, username: assignedUsername };
    });
  };
  const updateRoom = (updatedRoomInfo: roomJsonObj) => {
    setRoomInfo(updatedRoomInfo);
  };

  useEffect(() => {
    if (room_id) socket.emit('join_room', { room_id });
  }, [room_id]);

  useEffect(() => {
    socket.on('joined_room', joinRoom);
    socket.on('username_updated', assignUsername);
    socket.on('room_update', updateRoom);
    socket.on('you_are_kicked', () => navigatePath('/'));
  }, []);

  if (!room_id) {
    return <div>loading...</div>;
  } else if (room_id && !roomFound) {
    return (
      <div>
        room {room_id} not found :( <button onClick={() => navigatePath('/')}>leave</button>
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
        <GameContainer data={{ room_id: room_id.toString(), roomInfo, userInfo: userInfo }} />
        <ChatContainer data={{ room_id: room_id.toString(), roomInfo, userInfo: userInfo }} />
      </div>
    );
  }
};

export default Room;
