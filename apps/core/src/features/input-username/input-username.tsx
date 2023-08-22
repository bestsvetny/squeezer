import React, { useState } from 'react';
import { Box, Button, FormControl, Input } from '@chakra-ui/react';
import { useChatStore } from 'widgets/chat-widget/model';

export const InputUsername = () => {
    const [username, setUsername] = useState('');
    const createUser = useChatStore.use.createUser();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username !== '') {
            createUser(username);
            setUsername('');
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <FormControl
                    display='flex'
                    p='15px'
                    gap='10px'
                    background='#fff'
                    boxShadow='2px 3px 5px #ddd'
                    borderRadius='5px'
                >
                    <Input
                        placeholder='Input username'
                        autoComplete='off'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button type='submit'>Enter</Button>
                </FormControl>
            </form>
        </Box>
    );
};
