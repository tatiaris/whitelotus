import io from 'socket.io-client';

const socketUrl = "http://localhost:8888/";
// const socketUrl = (process.env.ENVIRONMENT === "test") ? "http://localhost:8888/" : "https://rtbgs.herokuapp.com/"

export const socket = io(socketUrl, {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd'
  }
});
