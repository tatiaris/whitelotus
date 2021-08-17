import React, { useEffect, useState } from 'react';
import { socket } from '../../../util/socket';
import { notificationObj } from '../interfaces';
import * as style from '../ui/css/NotificationContainer.module.css';

/**
 * NotificationContainer component
 */

export const NotificationContainer = (): React.ReactElement => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState('default');

  const sendNotification = (notification: notificationObj) => {
    const { content: notifContent, type: notifType } = notification;
    document.getElementById('notification-container').classList.remove('notification-container-visible');
    document.getElementById('notification-container').classList.add('notification-container');
    setVisible(false);
    setContent('');
    setTimeout(() => {
      setContent(notifContent);
      setType(notifType);
      setVisible(true);
    }, 1000);
  };

  const handleClick = () => {
    setVisible(false);
  };

  useEffect(() => {
    socket.on('notification', sendNotification);
  }, []);

  return (
    <div className={style[type]}>
      <div id="notification-container" onClick={handleClick} onKeyDown={handleClick} role="presentation" className={style[`notification-container${visible ? '-visible' : ''}`] + ' shadow-25'}>
        {content}
      </div>
    </div>
  );
};

export default NotificationContainer;
