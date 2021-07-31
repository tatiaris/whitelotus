import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { socket } from '../../../util/socket';
import GameContainer, { roomJsonObj } from '../../components/common/GameContainer';
import ChatContainer from '../../components/common/ChatContainer';

/**
 * Room Page
 */
export const Room = () => {
  const router = useRouter();
  const { room_id } = router.query;

  const [username, setUsername] = useState('');
  const [roomInfo, setRoomInfo] = useState<roomJsonObj>({
    totalPlayers: 1,
    players: []
  });

  const assignUsername = (assignedUsername: string) => {
    setUsername(assignedUsername);
  };
  const updateRoom = (updatedRoomInfo: any) => {
    console.log(updatedRoomInfo);
    setRoomInfo(updatedRoomInfo);
  };

  useEffect(() => {
    if (room_id) socket.emit('join_room', { room_id });
  }, [room_id]);

  useEffect(() => {
    socket.on('joined_room', assignUsername);
    socket.on('username_updated', assignUsername);
    socket.on('room_update', updateRoom);
  }, []);

  return room_id ? (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <GameContainer data={{ room_id: room_id.toString(), roomInfo: roomInfo, username: username }} />
      <ChatContainer data={{ room_id: room_id.toString(), username: username }} />
    </div>
  ) : (
    <div>loading...</div>
  );
};

export default Room;
