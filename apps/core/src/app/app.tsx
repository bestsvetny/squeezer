import React from 'react';
import { BoardWidget } from 'widgets/board-widget';
import './styles/index.css';
import { ChakraProvider, Grid } from '@chakra-ui/react';
import { ChatWidget } from 'widgets/chat-widget';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAppStore } from 'app/app-store';
import { Authorization } from 'features/authorization';
import { AppBar } from 'features/app-bar';

export const App = () => {
    const isAuth = useAppStore.use.userSession().isAuth;
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                {isAuth ? (
                    <>
                        <AppBar />
                        <Grid templateColumns={'1fr 25rem'}>
                            <BoardWidget />
                            <ChatWidget />
                        </Grid>
                    </>
                ) : (
                    <Authorization />
                )}
            </ChakraProvider>
        </QueryClientProvider>
    );
};
