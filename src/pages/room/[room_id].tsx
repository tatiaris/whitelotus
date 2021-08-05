import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { socket } from '../../../util/socket';
import GameContainer, { roomJsonObj } from '../../components/common/GameContainer';
import ChatContainer from '../../components/common/ChatContainer';

/**
 * Room Page
 */

interface joiningData {
  username: string;
  gameType: string;
}

export const Room = () => {
  const router = useRouter();
  const { room_id } = router.query;
  const [roomFound, setRoomFound] = useState(false);
  const [username, setUsername] = useState('');
  const [roomInfo, setRoomInfo] = useState<roomJsonObj>({
    gameType: 'none',
    totalPlayers: 1,
    players: []
  });

  const joinRoom = (param: joiningData) => {
    setRoomFound(true);
    assignUsername(param.username);
    setRoomInfo((roomInfo) => ({ ...roomInfo, gameType: param.gameType }));
  };

  const assignUsername = (assignedUsername: string) => {
    setUsername(assignedUsername);
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
  }, []);

  if (!room_id) {
    return <div>loading...</div>;
  } else if (room_id && !roomFound) {
    return <div>room {room_id} not found :(</div>;
  } else {
    return (
      <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
        <GameContainer data={{ room_id: room_id.toString(), roomInfo: roomInfo, username: username }} />
        <ChatContainer data={{ room_id: room_id.toString(), username: username }} />
      </div>
    );
  }
};

export default Room;
