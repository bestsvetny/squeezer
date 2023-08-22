import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import { createSelectors, Entities } from 'shared';
import { devtools } from 'zustand/middleware';

export type User = {
    id: string | null;
    username: string | null;
};

type Session = {
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
    session: Session;
    messages: Entities<Message>;
    sendMessage: (textMessage: string) => void;
    pushNewMessage: (newMessage: Message) => void;
    createUser: (username: string) => void;
}

const initialState = {
    session: {
        id: null,
        username: null,
        isAuth: false
    },
    messages: {
        ids: ['1', '2', '3'],
        entities: {
            1: {
                id: '1',
                ts: new Date().toString(),
                text: 'lorem ipsum dolor sit amet',
                user: {
                    id: '1',
                    username: 'Alice'
                }
            },
            2: {
                id: '2',
                ts: new Date().toString(),
                text: 'Foo',
                user: {
                    id: '2',
                    username: 'Bob'
                }
            },
            3: {
                id: '3',
                ts: new Date().toString(),
                text: 'Bar',
                user: {
                    id: '1',
                    username: 'Alice'
                }
            }
        }
    }
};

const useChatStoreBase = create<ChatState>()(
    devtools(
        immer((set, get) => ({
            ...initialState,
            sendMessage: (textMessage) => {
                const newMessage = {
                    //side effects
                    id: uuidv4(),
                    ts: new Date().toString(),
                    text: textMessage,
                    user: get().session
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
                    state.session = newUser;
                });
            }
        }))
    )
);

export const useChatStore = createSelectors(useChatStoreBase);
