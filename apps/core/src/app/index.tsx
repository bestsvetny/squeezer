import React from 'react';
import { Board } from 'features/board';
import './styles/index.css';
import { ChakraProvider, Grid } from '@chakra-ui/react';
import { ChatWidget } from 'widgets/chat-widget';

export const App = () => {
    return (
        <ChakraProvider>
            <Grid templateColumns={'1fr 25rem'}>
                <Board />
                <ChatWidget />
            </Grid>
        </ChakraProvider>
    );
};
