import React from 'react';
import { Board } from 'features/board';
import './styles/index.css';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { ChatWidget } from 'widgets/chat-widget';

export const App = () => {
    return (
        <ChakraProvider>
            <Flex>
                <Board />
                <ChatWidget />
            </Flex>
        </ChakraProvider>
    );
};
