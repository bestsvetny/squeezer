import { StateCreator } from 'zustand';
import { ChatSlice } from 'widgets/chat-widget/model/chat-slice';

export type UserSession = { userId?: number; accessToken?: string; username?: string; isAuth: boolean };

export interface SessionSlice {
    userSession: UserSession;
    setUser: (userId: number, accessToken: string, username: string) => void;
    logout: () => void;
}
const initialState = {
    userSession: {
        isAuth: false
    }
};

export const createSessionSlice: StateCreator<
    SessionSlice & ChatSlice,
    [['zustand/devtools', never], ['zustand/persist', UserSession], ['zustand/immer', never]],
    [],
    SessionSlice
> = (set) => ({
    ...initialState,
    setUser: (userId, accessToken, username) =>
        set((state) => {
            state.userSession = { userId, accessToken, username, isAuth: true };
        }),
    logout: () =>
        set((state) => {
            state.userSession = { isAuth: false };
        })
});
