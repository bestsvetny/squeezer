import React from 'react';
import { MessageForm } from 'features/message-form';
import { Box, Flex } from '@chakra-ui/react';
import { ChatMessage } from 'entities/chat-message';
import { v4 as uuidv4 } from 'uuid';

const mockMessages = [
    {
        id: uuidv4(),
        my: false,
        username: 'Bob',
        text: 'lorem ipsum lorem ipsum lorem ipsum lorem',
        ts: new Date().toString()
    },
    {
        id: uuidv4(),
        my: false,
        username: 'Alice',
        text: 'Foo bar',
        ts: new Date().toString()
    },
    {
        id: uuidv4(),
        my: true,
        username: 'Pete',
        text: 'Baz',
        ts: new Date().toString()
    }
];
export const ChatWidget = () => {
    return (
        <Box
            height='100vh'
            display='flex'
            flexDirection='column'
            justifyContent='end'
            background='#f3f3f3'
            zIndex='1000'
            boxShadow='0 0 3px #818181'
        >
            <Flex flexDirection='column' padding='0 5px 10px 5px' gap='5px'>
                {mockMessages.map((msg) => (
                    <ChatMessage key={msg.id} my={msg.my} username={msg.username} text={msg.text} ts={msg.ts} />
                ))}
            </Flex>
            <MessageForm />
        </Box>
    );
};
