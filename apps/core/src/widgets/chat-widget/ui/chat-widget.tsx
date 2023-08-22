import React from 'react';
import { MessageForm } from 'features/message-form';
import { Box, Flex } from '@chakra-ui/react';
import { ChatMessage } from 'entities/chat-message';
import { useChatStore } from 'widgets/chat-widget/model/chat-store';
import { denormalize } from 'shared';
export const ChatWidget = () => {
    const messages = useChatStore.use.messages();
    const messagesArray = denormalize(messages);

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
            <Flex flexDirection='column' padding='0 10px 10px 10px' gap='5px'>
                {messagesArray.map((msg) => (
                    <ChatMessage user={msg.user} text={msg.text} ts={msg.ts} />
                ))}
            </Flex>
            <MessageForm />
        </Box>
    );
};
