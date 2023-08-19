import React from 'react';
import { Button, FormControl, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';

export const MessageForm = () => {
    return (
        <FormControl>
            <InputGroup size='lg'>
                <Input
                    type='text'
                    placeholder='Write a message...'
                    background='#fff'
                    borderRadius='none'
                    focusBorderColor='#fff'
                    pr='4.5rem'
                    border='none'
                />
                <InputRightAddon width='4rem' padding='0'>
                    <Button height='100%' width='100%' border='none' borderRadius='none'>
                        Send
                    </Button>
                </InputRightAddon>
            </InputGroup>
        </FormControl>
    );
};
