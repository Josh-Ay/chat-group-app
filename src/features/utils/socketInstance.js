import { io } from "socket.io-client";

export const socketInstance = io(process.env.REACT_APP_API_URL);
