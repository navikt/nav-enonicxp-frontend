import { Server } from 'http';
import WebSocket from 'ws';

export const websockets = (expressServer: Server) => {
    const websocketServer = new WebSocket.Server({
        noServer: true,
        path: '/_next/webpack-hmr',
    });

    expressServer.on('upgrade', (request, socket, head) => {
        websocketServer.handleUpgrade(request, socket, head, (websocket) => {
            websocketServer.emit('connection', websocket, request);
        });
    });

    websocketServer.on('connection', function connection(websocketConnection, connectionRequest) {
        const [_path] = connectionRequest?.url?.split('?') || [];

        websocketConnection.on('message', (message) => {
            websocketConnection.send(
                JSON.stringify({ message: 'There be gold in them thar hills.' })
            );
        });
    });

    return websocketServer;
};
