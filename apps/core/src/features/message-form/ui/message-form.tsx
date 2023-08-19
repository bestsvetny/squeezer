import React from 'react';
import { Button, FormControl, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import style from './message-form.module.css';

// TODO: focusBorderColor on input
export const MessageForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('hello');
    };
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <FormControl borderTop='1px solid #ddd'>
                <InputGroup size='lg'>
                    <Input
                        className={style.messageInput}
                        type='text'
                        placeholder='Write a message...'
                        background='#fff'
                        borderRadius='0'
                        border='none'
                        fontSize='1em'
                        autoComplete='off'
                    />
                    <InputRightAddon padding='0' borderRadius='0' border='none'>
                        <Button
                            type='submit'
                            variant='ghost'
                            height='100%'
                            width='100%'
                            border='none'
                            background='#fff'
                            color='#4b4f56'
                        >
                            Send
                        </Button>
                    </InputRightAddon>
                </InputGroup>
            </FormControl>
        </form>
    );
};
