import io from 'socket.io-client';

// export const socket = io("http://localhost:8888/", {
export const socket = io('https://rtbgs.herokuapp.com/', {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd'
  }
});
