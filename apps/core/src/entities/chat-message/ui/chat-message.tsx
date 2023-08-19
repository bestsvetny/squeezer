import React from 'react';
import { Flex } from '@chakra-ui/react';
import style from './chat-message.module.css';
import dayjs from 'dayjs';

interface ChatMessageProps {
    my: boolean;
    username: string;
    text: string;
    ts: string;
}
export const ChatMessage = ({ my, username, text, ts }: ChatMessageProps) => {
    const date = dayjs(ts).format('hh:mma');
    return (
        <div className={`${style.chatMessage} ${my && style.my}`}>
            <Flex flexDirection='column'>
                {!my && <span className={style.username}>{username}</span>}
                <div>
                    <p className={style.text}>
                        {text}
                        <div className={style.tsHidden}>{date}</div>
                    </p>
                </div>
            </Flex>
            <div className={style.ts}>{date}</div>
        </div>
    );
};
