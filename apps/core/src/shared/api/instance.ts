import axios from 'axios';
import { API_URL } from 'shared/constants';
export const instance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
});
