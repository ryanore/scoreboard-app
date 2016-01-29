import SocketIo from 'socket.io-client';
import {apiRoot} from 'config';
let io = SocketIo(apiRoot);

window.addEventListener('focus', () => {
  console.log('window')
});

export default io;
