import io from 'socket.io-client';
import {URL} from "../../url"
const socket = io(URL);
export default socket;
