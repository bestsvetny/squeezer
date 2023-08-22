import React from 'react';
import { BoardWidget } from 'widgets/board-widget';
import './styles/index.css';
import { ChakraProvider, Grid } from '@chakra-ui/react';
import { ChatWidget } from 'widgets/chat-widget';

export const App = () => {
    return (
        <ChakraProvider>
            <Grid templateColumns={'1fr 25rem'}>
                <BoardWidget />
                <ChatWidget />
            </Grid>
        </ChakraProvider>
    );
};
