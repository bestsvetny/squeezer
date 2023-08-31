import { create } from 'zustand';
import { createSelectors } from 'shared';
import { createSessionSlice, SessionSlice } from 'entities/session';
import { ChatSlice, createChatSlice } from 'widgets/chat-widget/model/chat-slice';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const useAppStoreBase = create<SessionSlice & ChatSlice>()(
    devtools(
        immer((...rest) => ({
            ...createSessionSlice(...rest),
            ...createChatSlice(...rest)
        }))
    )
);

export const useAppStore = createSelectors(useAppStoreBase);
