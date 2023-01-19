import { IncomingMessage } from 'http';
import { createWebSocketStream, WebSocket } from 'ws';
import { commandsHandler } from '../commands/commandsHandler.js';

export const wsConnectionHandler = async (ws: WebSocket, req: IncomingMessage) => {
  const port = req.socket.localPort;
  const wsStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  console.log(`Establish websocket connection on ${port} port!`);
  wsStream.on('data', async (chunk) => {
    const data = <string>chunk.toString();

    const [command, ...params] = data.split(' ');
    const [arg1, arg2] = params.map((x) => +x || 0);
    const { isResponseNeeded, res } = await commandsHandler(command, arg1, arg2);

    if (isResponseNeeded) {
      wsStream.write(`${res}\0`);
    }
  });

  ws.onclose = () => {
    console.log(`Close websocket connection on ${port} port!`);
    wsStream.destroy();
  };
};
