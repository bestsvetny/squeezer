import { StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Entities } from 'shared';
import { SessionSlice } from 'entities/session';
import { Socket } from 'socket.io-client';

export type MessageUser = {
    id: number;
    username: string;
};

export type EventMessage = {
    id: string;
    ts: string;
    text: string;
    user: MessageUser;
};

export interface ChatSlice {
    messages: Entities<EventMessage>;
    isConnected: boolean;
    socket: Socket | null;
    sendMessage: (textMessage: string) => void;
    pushNewMessage: (newMessage: EventMessage) => void;
    setSocket: (socket: Socket) => void;
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
    [['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never]],
    [],
    ChatSlice
> = (set, get) => ({
    ...initialState,
    sendMessage: (textMessage) => {
        const user = get().userSession;
        const newMessage = {
            id: uuidv4(),
            ts: new Date().toString(),
            text: textMessage,
            user: { id: user.userId, username: user.username }
        };
        const socket = get().socket;
        if (socket) {
            console.log('send');
            socket.emit('chat', newMessage);
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
    setSocket: (socket: Socket) => {
        console.log('set socket');
        set((state) => {
            // type conflict
            // @ts-ignore
            state.socket = socket;
        });
    },
    setIsConnected: (isConnected) => {
        set((state) => {
            state.isConnected = isConnected;
        });
    }
});
