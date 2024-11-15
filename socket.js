import io from 'socket.io-client';
import {BACKEND_URL} from "./url"
const socket = io(BACKEND_URL);
export default socket;
