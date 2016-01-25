import SocketIo from 'socket.io-client';
import {apiRoot} from 'config';

let io = SocketIo(apiRoot);

export default io;
