import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import { createSelectors, Entities } from 'shared';
import { devtools } from 'zustand/middleware';

export type User = {
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
    user: User;
    messages: Entities<Message>;
    sendMessage: (textMessage: string) => void;
    pushNewMessage: (newMessage: Message) => void;
    createUser: (username: string) => void;
}

const useChatStoreBase = create<ChatState>()(
    devtools(
        immer((set, get) => ({
            user: {
                id: null,
                username: null,
                isAuth: false
            },
            messages: { ids: [], entities: {} },
            sendMessage: (textMessage) => {
                const newMessage = {
                    //side effects
                    id: uuidv4(),
                    ts: new Date().toString(),
                    text: textMessage,
                    user: get().user
                };
                get().pushNewMessage(newMessage);
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
                    state.user = newUser;
                });
            }
        }))
    )
);

export const useChatStore = createSelectors(useChatStoreBase);
