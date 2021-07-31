import React, { useEffect } from 'react';
import { useState } from 'react';
import { socket } from '../../../util/socket';

/**
 * ChatContainer component
 */
interface ChatProps {
  room_id: string;
  username: string;
}
interface NewMsg {
  username: string;
  content: string;
}
interface Props {
  data: ChatProps;
}
export const ChatContainer: React.FC<Props> = (props): React.ReactElement => {
  const { room_id, username } = props.data;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = () => {
    socket.emit('message', { room_id: room_id, username: username, content: message });
  };

  const addNewMessage = (newMsg: NewMsg) => {
    setMessages((messages) => [...messages, `${newMsg.username}: ${newMsg.content}`]);
  };

  useEffect(() => {
    socket.on('new_message', addNewMessage);
  }, []);

  return (
    <div style={{ width: "20%", height: "100%", padding: "1rem", minWidth: "200px" }}>
      <div>
        <div>
          <input onChange={(e) => setMessage(e.target.value)} type="text" name="message" id="message" placeholder="send a message..."/>
        </div>
        <button onClick={sendMessage}>send</button>
      </div>
      <div>Chat:</div>
      <div>
        {messages.map((m, i) => (
          <div key={`message-${i}`}>{m}</div>
        ))}
      </div>
    </div>
  );
};

export default ChatContainer;
