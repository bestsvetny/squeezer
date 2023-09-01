import React, { useState } from 'react';
import { Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { useRegister } from 'features/authorization/model/auth-query';

interface RegisterFormProps {
    onChangeView: () => void;
}

export const RegisterForm = ({ onChangeView }: RegisterFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { mutate, isLoading } = useRegister();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username !== '' && password !== '') {
            mutate({ username, password });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Flex
                display='flex'
                flexDirection='column'
                minWidth='400px'
                p='15px'
                gap='10px'
                background='#fff'
                border='2px solid #ddd'
                borderRadius='5px'
            >
                <Text fontSize='2xl' fontWeight='700' alignSelf='center'>
                    Register
                </Text>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type='text'
                        autoComplete='off'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type='password'
                        autoComplete='off'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button
                    type='submit'
                    isLoading={isLoading}
                    isDisabled={!(username && password)}
                    loadingText={<div>Loading...</div>}
                    colorScheme='blue'
                >
                    Sign up
                </Button>
                <Button size='sm' variant='link' onClick={onChangeView}>
                    Sign in
                </Button>
            </Flex>
        </form>
    );
};
