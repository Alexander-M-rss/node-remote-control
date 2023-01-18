import { httpServer } from './http_server/index.js';
import { WebSocketServer } from 'ws';
import { wsConnectionHandler } from './ws_server/index.js';

const HTTP_PORT = 8181;
const WS_PORT = 8080;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});

const wsServer = new WebSocketServer({ port: WS_PORT }, () => {
  console.log(`Start websocket server on the ${WS_PORT} port!`);
});

wsServer.on('connection', wsConnectionHandler);

process.on('SIGINT', () => {
  wsServer.close();
  wsServer.clients.forEach((client) => {
    client.close();
  });
  httpServer.close();
  httpServer.closeAllConnections();
  console.log('\nClose http and websocket servers!');
  process.exit();
});
