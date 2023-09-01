import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useAppStore } from 'app/app-store';

export const AppBar = () => {
    const logout = useAppStore.use.logout();
    const username = useAppStore.use.userSession().username;

    return (
        <Box position='absolute' top='5px' right='5px' zIndex={10000}>
            <Flex alignItems='center' gap='10px'>
                <Text fontSize='md' fontWeight='500'>
                    {username}
                </Text>
                <Button size='sm' colorScheme='blue' onClick={logout}>
                    Logout
                </Button>
            </Flex>
        </Box>
    );
};
