import React, { useEffect } from 'react';
import { useState } from 'react';
import { socket } from '../../../util/socket';
import { navigatePath } from '../Helper';
import { GameProps } from './Table';
import PlayersList from './PlayersList';
import * as style from '../ui/css/ChatContainer.module.css';

/**
 * ChatContainer component
 */
interface NewMsg {
  username: string;
  content: string;
}
interface Props {
  data: GameProps;
  visible: boolean;
  setVisible: CallableFunction;
}
export const ChatContainer: React.FC<Props> = (props): React.ReactElement => {
  const { room_id, userInfo } = props.data;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<NewMsg[]>([]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      socket.emit('message', { room_id: room_id, username: userInfo.username, content: message });
      (document.getElementById('message-input') as HTMLInputElement).value = '';
      setMessage('');
    }
  };

  const addNewMessage = (newMsg: NewMsg) => {
    setMessages((messages) => [...messages, newMsg]);
  };

  useEffect(() => {
    socket.on('new_message', addNewMessage);
  }, []);

  const chatContainerClass = props.visible ? `chat-container-visible` : 'chat-container';
  return (
    <div className={style[chatContainerClass]}>
      <div className={style['chat-wrapper']}>
        <div className={style['chat']}>
          {messages.map((m, i) => (
            <div key={`msg-${i}`} className={style['msg']}>
              <div className={style['content'] + ' shadow-25'}>
                <b>{m.username}</b>: {m.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={style['msg-inp-container'] + ' shadow-25'}>
        <form onSubmit={sendMessage} className={style['form']}>
          <input onChange={(e) => setMessage(e.target.value.trim())} id="message-input" className={style['inp']} type="text" placeholder="Send a message..." />
          <button className={style['send-btn']} type="submit">
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
