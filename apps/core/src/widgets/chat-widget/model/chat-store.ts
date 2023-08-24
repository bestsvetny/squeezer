import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import { createSelectors, Entities } from 'shared';
import { devtools } from 'zustand/middleware';

export type User = {
    id: string | null;
    username: string | null;
};

type UserSession = {
    id: string | null;
    username: string | null;
    isAuth: boolean;
};

type Message = {
    id: string;
    ts: string;
    text: string;
    user: User;
};

interface ChatState {
    userSession: UserSession;
    messages: Entities<Message>;
    isConnected: boolean;
    socket: WebSocket | null;
    sendMessage: (textMessage: string) => void;
    pushNewMessage: (newMessage: Message) => void;
    createUser: (username: string) => void;
    setSocket: (socket: WebSocket) => void;
    setIsConnected: (isConnected: boolean) => void;
}

const initialState = {
    socket: null,
    isConnected: false,
    userSession: {
        id: null,
        username: null,
        isAuth: false
    },
    messages: {
        ids: [],
        entities: {}
    }
};

const useChatStoreBase = create<ChatState>()(
    devtools(
        immer((set, get) => ({
            ...initialState,
            sendMessage: (textMessage) => {
                //side effects
                const newMessage = {
                    id: uuidv4(),
                    ts: new Date().toString(),
                    text: textMessage,
                    user: get().userSession
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
            createUser: (username: string) => {
                const newUser = { id: uuidv4(), username, isAuth: true };
                set((state) => {
                    state.userSession = newUser;
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
        }))
    )
);

export const useChatStore = createSelectors(useChatStoreBase);
