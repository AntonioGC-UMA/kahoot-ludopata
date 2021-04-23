import io from "socket.io-client";

const PORT = process.env.PORT || 8080;
export const socket = io();//io("http://kahoot-ludopata.herokuapp.com:" + PORT);