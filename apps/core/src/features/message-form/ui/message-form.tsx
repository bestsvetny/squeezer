import React, { useState } from 'react';
import { Button, FormControl, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import style from './message-form.module.css';
import { useAppStore } from 'app/app-store';

export const MessageForm = () => {
    const [textMessage, setTextMessage] = useState('');
    const sendMessage = useAppStore.use.sendMessage();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (textMessage !== '') {
            sendMessage(textMessage);
            setTextMessage('');
        }
    };
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <FormControl borderTop='1px solid #ddd'>
                <InputGroup size='lg'>
                    <Input
                        value={textMessage}
                        onChange={(e) => setTextMessage(e.target.value)}
                        className={style.messageInput}
                        type='text'
                        placeholder='Write a message...'
                        background='#fff'
                        borderRadius='0'
                        border='none'
                        fontSize='1em'
                        autoComplete='off'
                        autoFocus
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
