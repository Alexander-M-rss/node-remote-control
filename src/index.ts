import { httpServer } from './http_server/index.js';
import { WebSocketServer } from 'ws';
import { wsConnectionHandler } from './ws_server/index.js';

const HTTP_PORT = 8181;
const WS_PORT = 8080;

httpServer.listen(HTTP_PORT, () => {
  const addrInfo = httpServer.address();
  let host = 'localhost';

  if (typeof addrInfo !== 'string' && addrInfo?.address && addrInfo.address !== '::') {
    host = addrInfo.address;
  }
  console.log(`Start static http server http://${host}:${HTTP_PORT}`);
});

const wsServer = new WebSocketServer({ port: WS_PORT }, () => {
  const addrInfo = wsServer.address();
  let host = 'localhost';

  if (typeof addrInfo !== 'string' && addrInfo?.address && addrInfo.address !== '::') {
    host = addrInfo.address;
  }
  console.log(`Start websocket server ${host}:${WS_PORT}`);
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
