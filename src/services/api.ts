import { parseCookies } from '../../node_modules/nookies/dist/index';
import axios, { AxiosError } from '../../node_modules/axios/index';
// yarn add axios nookies jwt-decode

import { AuthTokenError } from './errors/AuthTokenError';
import { signOut } from '../contexts/AuthContext';

export function setupApiClient(context = undefined) {
    let cookies = parseCookies(context);

    const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${cookies['@app_client_pizzaria.token']}`
        }
    });

    api.interceptors.response.use(response => {
        return response;
    }), ((error: AxiosError) => {
        if (error.response.status === 401) {
            // não autorizado
            if (typeof window !== undefined) {
                // chama função de logout do usuário
                signOut();
            } else {
                return Promise.reject(new AuthTokenError());
            }
        }

        return Promise.reject(error);
    });

    return api;
}