import React from 'react';
import { Board } from 'features/board';
import './styles/index.css';
import { ChakraProvider } from '@chakra-ui/react';

export const App = () => {
    return (
        <ChakraProvider>
            <Board />
        </ChakraProvider>
    );
};
