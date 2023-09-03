import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';

type User = {
    id: number;
    username: string;
};

type Message = {
    id: string;
    ts: string;
    text: string;
    user: User;
};

@WebSocketGateway(5000, {
    path: '/',
    serveClient: false,
    cors: {
        origin: 'http://localhost:4001'
    }
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection {
    @WebSocketServer()
    server;

    public afterInit() {
        console.log(`init...`);
    }

    handleConnection() {
        console.log('connection');
    }

    broadcastMessage(message: Message) {
        this.server.emit('chat', message);
    }

    @SubscribeMessage('chat')
    handleEvent(@MessageBody() data: Message) {
        this.broadcastMessage(data);
        return { event: 'log', data: { messageId: data.id, status: 'received' } };
    }
}
