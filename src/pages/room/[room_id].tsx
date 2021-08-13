import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { socket } from '../../../util/socket';
import Table from '../../components/common/Table';
import ChatContainer from '../../components/common/ChatContainer';
import { navigatePath } from '../../components/Helper';
import { joiningData, PlayerObj, roomJsonObj } from '../../components/interfaces';
import RoomNotFound from '../../components/common/RoomNotFound';
import Loading from '../../components/common/Loading';

/**
 * Room Page
 */

export const Room = () => {
  const router = useRouter();
  const { room_id } = router.query;
  const [roomFound, setRoomFound] = useState(-1);
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
    setRoomFound(1);
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
    socket.on('room_not_found', () => setRoomFound(0));
  }, []);

  if (roomFound == -1) {
    return <Loading />;
  } else if (roomFound == 0) {
    return <RoomNotFound room_id={room_id.toString()} />;
  } else {
    return (
      <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
        <Table data={{ room_id: room_id.toString(), roomInfo, userInfo: userInfo }} />
        {/* <ChatContainer data={{ room_id: room_id.toString(), roomInfo, userInfo: userInfo }} /> */}
      </div>
    );
  }
};

export default Room;
