import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from '../../node_modules/nookies/dist/index';

// páginas acessadas por usuários não logados
export function naoLogados<P>(fn: GetServerSideProps<P>) {
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        // se já estiver logado -> redireciona
        const cookie = parseCookies(context);

        if (cookie['@app_client_pizzaria.token']) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }

        return await fn(context);
    }
}
