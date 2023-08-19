import React from 'react';
import { MessageForm } from 'features/message-form';
import { Box } from '@chakra-ui/react';

export const ChatWidget = () => {
    return (
        <Box
            width='25rem'
            height='100vh'
            display='flex'
            flexDirection='column'
            justifyContent='end'
            background='#f3f3f3'
        >
            <MessageForm />
        </Box>
    );
};
