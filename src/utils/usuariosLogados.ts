import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies, destroyCookie } from '../../node_modules/nookies/dist/index';
import { AuthTokenError } from '../services/errors/AuthTokenError';

// apenas usuários logados
export function usuariosLogados<P>(fn: GetServerSideProps<P>) {
    return async (context: GetServerSideProps): Promise<GetServerSidePropsResult<P>> => {
        const cookie = parseCookies(context);

        const token = cookie['@app_client_pizzaria.token'];

        // se não tem token, vai para login
        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        // se tem token, pode acessar
        try {
            return await fn(context);
        } catch (error) { // se der erro, efetua logout
            if (error instanceof AuthTokenError) {
                destroyCookie(context, '@app_client_pizzaria.token');

                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }
    }
}
