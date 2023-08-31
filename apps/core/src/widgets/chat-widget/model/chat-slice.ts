import { StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Entities } from 'shared';
import { SessionSlice } from 'entities/session';

export type User = {
    id: string | null;
    username: string | null;
};

type Message = {
    id: string;
    ts: string;
    text: string;
    user: User;
};

export interface ChatSlice {
    messages: Entities<Message>;
    isConnected: boolean;
    socket: WebSocket | null;
    sendMessage: (textMessage: string) => void;
    pushNewMessage: (newMessage: Message) => void;
    setSocket: (socket: WebSocket) => void;
    setIsConnected: (isConnected: boolean) => void;
}

const initialState = {
    socket: null,
    isConnected: false,
    messages: {
        ids: [],
        entities: {}
    }
};

export const createChatSlice: StateCreator<
    SessionSlice & ChatSlice,
    [['zustand/devtools', never], ['zustand/immer', never]],
    [],
    ChatSlice
> = (set, get) => ({
    ...initialState,
    sendMessage: (textMessage) => {
        const user = get().userSession;
        //side effects
        const newMessage = {
            id: uuidv4(),
            ts: new Date().toString(),
            text: textMessage,
            user: { id: user.userId, username: user.username }
        };
        const socket = get().socket;
        if (socket) {
            console.log('send');
            socket.send(JSON.stringify({ event: 'message', ...newMessage }));
        }
    },
    pushNewMessage: (newMessage) => {
        set((state) => {
            state.messages.ids.push(newMessage.id);
        });
        set((state) => {
            state.messages.entities[newMessage.id] = newMessage;
        });
    },
    setSocket: (socket: WebSocket) => {
        console.log('set socket');
        set((state) => {
            state.socket = socket;
        });
    },
    setIsConnected: (isConnected) => {
        set((state) => {
            state.isConnected = isConnected;
        });
    }
});
