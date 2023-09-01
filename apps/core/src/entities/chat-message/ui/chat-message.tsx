import React from 'react';
import { Flex } from '@chakra-ui/react';
import style from './chat-message.module.css';
import dayjs from 'dayjs';
import { useAppStore } from 'app/app-store';
import { User } from 'widgets/chat-widget';

interface ChatMessageProps {
    user: User;
    text: string;
    ts: string;
}
export const ChatMessage = ({ user, text, ts }: ChatMessageProps) => {
    const date = dayjs(ts).format('hh:mma');
    const sessionId = useAppStore.use.userSession().userId;
    return (
        <div className={`${style.chatMessage} ${sessionId === user.id && style.my}`}>
            <Flex flexDirection='column'>
                {sessionId !== user.id && <span className={style.username}>{user.username}</span>}
                <div>
                    <p className={style.text}>
                        {text}
                        <span className={style.tsHidden}>{date}</span>
                    </p>
                </div>
            </Flex>
            <div className={style.ts}>{date}</div>
        </div>
    );
};
