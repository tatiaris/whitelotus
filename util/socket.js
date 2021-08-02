import io from 'socket.io-client';

const socketUrl = 'http://localhost:8888';

export const socket = io(socketUrl, {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd'
  }
});
