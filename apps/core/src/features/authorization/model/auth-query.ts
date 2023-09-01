import { useMutation } from 'react-query';
import { Api } from 'shared';
import { useAppStore } from 'app/app-store';
import { useToast } from '@chakra-ui/react';

type AuthParams = { username: string; password: string };

export const useLogin = () => {
    const toast = useToast();

    return useMutation(({ username, password }: AuthParams) => Api().user.login(username, password), {
        onError: () => {
            toast({
                title: 'Server error',
                description: 'Something went wrong',
                status: 'error',
                duration: 6000,
                isClosable: true
            });
        },
        onSuccess: ({ data }) => {
            useAppStore.getState().setUser(data.id, data.access_token, data.username);
            toast({
                title: 'Success',
                description: 'Successfully signed in!',
                status: 'success',
                duration: 6000,
                isClosable: true
            });
        }
    });
};

export const useRegister = () => {
    const toast = useToast();

    return useMutation(({ username, password }: AuthParams) => Api().user.register(username, password), {
        onError: () => {
            toast({
                title: 'Server error',
                description: 'Something went wrong',
                status: 'error',
                duration: 6000,
                isClosable: true
            });
        },
        onSuccess: ({ data }) => {
            useAppStore.getState().setUser(data.id, data.access_token, data.username);
            toast({
                title: 'Success',
                description: 'Successfully signed up!',
                status: 'success',
                duration: 6000,
                isClosable: true
            });
        }
    });
};
