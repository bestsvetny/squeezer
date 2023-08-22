import React from 'react';
import { MessageForm } from 'features/message-form';
import { Box, Flex } from '@chakra-ui/react';
import { ChatMessage } from 'entities/chat-message';
import { useChatStore } from 'widgets/chat-widget/model/chat-store';
import { denormalize } from 'shared';
import { InputUsername } from 'features/input-username';
export const ChatWidget = () => {
    const messages = useChatStore.use.messages();
    const isAuth = useChatStore.use.session().isAuth;
    const messagesArray = denormalize(messages);

    return (
        <Box
            height='100vh'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            background='#f3f3f3'
        >
            {!isAuth ? (
                <InputUsername />
            ) : (
                <Box
                    height='100%'
                    width='100%'
                    display='flex'
                    flexDirection='column'
                    justifyContent='end'
                    zIndex='1000'
                    boxShadow='0 0 3px #818181'
                >
                    <Flex
                        flexDirection='column'
                        padding='0 10px 10px 10px'
                        gap='5px'
                        overflowY='auto'
                        css={{
                            '&::-webkit-scrollbar': {
                                width: '4px'
                            },
                            '&::-webkit-scrollbar-track': {
                                width: '6px'
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: '#cdcdcd',
                                borderRadius: '24px'
                            }
                        }}
                    >
                        {messagesArray.map((msg) => (
                            <ChatMessage key={msg.id} user={msg.user} text={msg.text} ts={msg.ts} />
                        ))}
                    </Flex>
                    <MessageForm />
                </Box>
            )}
        </Box>
    );
};
