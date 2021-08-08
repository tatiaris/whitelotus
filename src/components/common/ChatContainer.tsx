import React, { useEffect } from 'react';
import { useState } from 'react';
import { socket } from '../../../util/socket';
import { navigatePath } from '../Helper';
import { GameProps } from './GameContainer';
import PlayersList from './PlayersList';

/**
 * ChatContainer component
 */
interface NewMsg {
  username: string;
  content: string;
}
interface Props {
  data: GameProps;
}
export const ChatContainer: React.FC<Props> = (props): React.ReactElement => {
  const { room_id, userInfo } = props.data;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      socket.emit('message', { room_id: room_id, username: userInfo.username, content: message });
      (document.getElementById('message-input') as HTMLInputElement).value = '';
      setMessage('');
    }
  };

  const addNewMessage = (newMsg: NewMsg) => {
    setMessages((messages) => [...messages, `${newMsg.username}: ${newMsg.content}`]);
  };

  useEffect(() => {
    socket.on('new_message', addNewMessage);
  }, []);

  return (
    <div style={{ width: '20%', height: '100%', padding: '1rem', minWidth: '200px' }}>
      <div>
        room: {room_id} <button onClick={() => navigatePath('/')}>leave</button>
      </div>
      <br />
      <PlayersList {...props} />
      <br />
      <div>
        <form id="message-form" onSubmit={sendMessage}>
          <div>
            <input onChange={(e) => setMessage(e.target.value.trim())} type="text" name="message" id="message-input" placeholder="send a message..." />
          </div>
          <button type="submit">send</button>
        </form>
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
