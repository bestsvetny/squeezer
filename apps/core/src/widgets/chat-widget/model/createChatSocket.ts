import { io } from 'socket.io-client';
import { CHAT_HOST_URL } from 'shared/constants';

export const createChatSocket = () => {
    if (process.env.NODE_ENV === 'production') {
        return io(CHAT_HOST_URL, { path: '/chat/api', addTrailingSlash: false });
    } else {
        return io(CHAT_HOST_URL);
    }
};
