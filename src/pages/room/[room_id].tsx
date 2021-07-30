import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { socket } from '../../../util/socket';

/**
 * Room Page
 */
export const Room = () => {
  const router = useRouter();
  const { room_id } = router.query;

  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = () => {
    socket.emit("message", { room_id: room_id, username: username, content: message });
  }

  const addNewMessage = (msg: string) => {
    console.log(socket.id)
    console.log(`received new message ${msg}`);
    setMessages(messages => [...messages, msg])
  }
  const joinRoom = (assignedUsername: string) => {
    console.log(`joined room as user ${assignedUsername}`);
    setUsername(assignedUsername)
  }

  useEffect(() => {
    if (room_id) socket.emit('join_room', { room_id })
  }, [room_id])

  useEffect(() => {
    socket.on("new_message", addNewMessage)
    socket.on("joined_room", joinRoom)
  }, [])
  
  return (
    <div style={{ padding: "2rem" }}>
      <div>joined room: {room_id}</div>
      <div>username: {username}</div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "250px" }}>
          <input onChange={e => setMessage(e.target.value)} type="text" name="message" id="message" />
        </div>
        <button onClick={sendMessage}>send</button>
      </div>
      <div>Chat:</div>
      <div>
        {messages.map((m, i) => <div key={`message-${i}`}>{m}</div>)}
      </div>
    </div>
  );
};

export default Room;
