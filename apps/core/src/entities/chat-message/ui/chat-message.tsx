import React from 'react';
import { Flex } from '@chakra-ui/react';
import style from './chat-message.module.css';
import dayjs from 'dayjs';
import { useChatStore, User } from 'widgets/chat-widget/model';

interface ChatMessageProps {
    user: User;
    text: string;
    ts: string;
}
export const ChatMessage = ({ user, text, ts }: ChatMessageProps) => {
    const date = dayjs(ts).format('hh:mma');
    const session = useChatStore.use.session();
    return (
        <div className={`${style.chatMessage} ${session.id === user.id && style.my}`}>
            <Flex flexDirection='column'>
                {session.id !== user.id && <span className={style.username}>{user.username}</span>}
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
