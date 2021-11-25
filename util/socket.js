import io from 'socket.io-client';

const socketUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8888' : 'https://rtbgs.herokuapp.com';

export const socket = io(socketUrl, {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd'
  }
});
