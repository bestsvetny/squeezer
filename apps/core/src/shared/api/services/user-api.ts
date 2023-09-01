import { AxiosInstance, AxiosResponse } from 'axios';

export interface ILogin {
    id: number;
    username: string;
    access_token: string;
}

interface IRegister extends ILogin {}

export const UserApi = (instance: AxiosInstance) => ({
    login: (username: string, password: string): Promise<AxiosResponse<ILogin>> => {
        return instance.post<ILogin>('/auth/login', { username, password });
    },
    register: (username: string, password: string): Promise<AxiosResponse<ILogin>> => {
        return instance.post<IRegister>('/auth/registration', { username, password });
    }
});
