import Head from "../../../node_modules/next/head";
import { Header } from "../../components/Header/index";
import { usuariosLogados } from "../../utils/usuariosLogados"
import styles from './styles.module.scss';

import { FiRefreshCcw } from 'react-icons/fi';

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Painel - Sujeito Pizza</title>
            </Head>

            <Header />

            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button>
                        <FiRefreshCcw size={25} color="#3fffa3"/>
                    </button>
                </div>

                <article className={styles.listOreders}>
                    <section className={styles.orderItem}> 
                        <button>
                            <div className={styles.tag}></div>
                            <span>Mesa 30</span>
                        </button>
                    </section>                  
                </article>
            </main>
        </>
    )
}

export const getServerSideProps = usuariosLogados(async (context) => {
    return {
        props: {}
    }
});