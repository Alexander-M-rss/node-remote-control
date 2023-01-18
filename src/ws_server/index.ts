import { IncomingMessage } from 'http';
import { createWebSocketStream, WebSocket } from 'ws';

export const wsConnectionHandler = async (ws: WebSocket, req: IncomingMessage) => {
  const port = req.socket.localPort;
  const wsStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  console.log(`Establish websocket connection on ${port} port!`);
  wsStream.on('data', (chunk) => {
    const data = <string>chunk.toString();

    const [command, ...params] = data.split(' ');
    const [arg1, arg2] = params.map((x) => +x);

    console.log('command =>', command, arg1, arg2);
  });

  ws.onclose = () => {
    console.log(`Close websocket connection on ${port} port!`);
    wsStream.destroy();
  };
};
