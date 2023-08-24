import { WebSocketServer } from 'ws';

const PORT = 5000;

type Message = {
    event: 'message' | 'connection';
};

const wss = new WebSocketServer(
    {
        port: PORT
    },
    () => console.log(`Server started on ${PORT}`)
);

wss.on('connection', function connection(ws) {
    console.log('connection');
    ws.on('message', function (data) {
        const message = JSON.parse(data.toString());
        console.log('received', message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message);
                break;
        }
    });
});

function broadcastMessage(message: Message) {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(message));
    });
}
