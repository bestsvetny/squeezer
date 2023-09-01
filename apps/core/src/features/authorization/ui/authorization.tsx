import React, { useState } from 'react';
import { LoginForm } from 'features/authorization/ui/login-form';
import { Flex } from '@chakra-ui/react';
import { RegisterForm } from 'features/authorization/ui/register-form';

export const Authorization = () => {
    const [view, setView] = useState<'register' | 'login'>('register');
    return (
        <Flex flexDirection='column' justifyContent='center' alignItems='center' height='100vh'>
            {view === 'login' && <LoginForm onChangeView={() => setView('register')} />}
            {view === 'register' && <RegisterForm onChangeView={() => setView('login')} />}
        </Flex>
    );
};
