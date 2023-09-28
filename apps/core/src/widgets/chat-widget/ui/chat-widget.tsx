import React, { useEffect } from 'react';
import { MessageForm } from 'features/message-form';
import { Box, Flex } from '@chakra-ui/react';
import { ChatMessage } from 'entities/chat-message';
import { denormalize } from 'shared';
import { useAppStore } from 'app/app-store';
import { Message } from 'postcss';
import { createChatSocket } from 'widgets/chat-widget/model/createChatSocket';
export const ChatWidget = () => {
    const messages = useAppStore.use.messages();
    const isConnected = useAppStore.use.isConnected();
    const setSocket = useAppStore.use.setSocket();
    const pushNewMessage = useAppStore.use.pushNewMessage();
    const setIsConnected = useAppStore.use.setIsConnected();

    const messagesArray = denormalize(messages);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            console.log('Socket opened');
        }

        function onDisconnect() {
            setIsConnected(false);
            console.log('Socket closed');
        }

        function onChatEvent(message: Message) {
            pushNewMessage({
                id: message.id,
                ts: message.ts,
                text: message.text,
                user: message.user
            });
        }

        const socket = createChatSocket();
        setSocket(socket);
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chat', onChatEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('chat', onChatEvent);
        };
    }, [pushNewMessage, setIsConnected, setSocket]);

    return (
        <Box
            height='100vh'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            background='#f3f3f3'
        >
            {isConnected && (
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
            {!isConnected && <div>Connecting...</div>}
        </Box>
    );
};
