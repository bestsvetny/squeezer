import { create } from 'zustand';
import { createSelectors } from 'shared';
import { createSessionSlice, SessionSlice } from 'entities/session';
import { ChatSlice, createChatSlice } from 'widgets/chat-widget/model/chat-slice';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const useAppStoreBase = create<SessionSlice & ChatSlice>()(
    devtools(
        persist(
            immer((...rest) => ({
                ...createSessionSlice(...rest),
                ...createChatSlice(...rest)
            })),
            {
                name: 'app-storage',
                storage: createJSONStorage(() => sessionStorage),
                partialize: (state) => ({ userSession: state.userSession })
            }
        )
    )
);

export const useAppStore = createSelectors(useAppStoreBase);
