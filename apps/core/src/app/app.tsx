import React from 'react';
import { BoardWidget } from 'widgets/board-widget';
import './styles/index.css';
import { ChakraProvider, Grid } from '@chakra-ui/react';
import { ChatWidget } from 'widgets/chat-widget';
import { Authorization } from 'features/authorization/authorization';
import { useSessionStore } from 'features/authorization/model/session.store';
import { QueryClient, QueryClientProvider } from 'react-query';

export const App = () => {
    const isAuth = useSessionStore.use.isAuth();
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                {isAuth ? (
                    <Grid templateColumns={'1fr 25rem'}>
                        <BoardWidget />
                        <ChatWidget />
                    </Grid>
                ) : (
                    <Authorization />
                )}
            </ChakraProvider>
        </QueryClientProvider>
    );
};
