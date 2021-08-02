import io from 'socket.io-client';

const socketUrl = 'https://rtbgs.herokuapp.com';

export const socket = io(socketUrl, {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd'
  }
});
