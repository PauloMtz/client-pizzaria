import { useState } from "react";
import Head from "../../../node_modules/next/head";
import { Header } from "../../components/Header/index";
import { usuariosLogados } from "../../utils/usuariosLogados"
import styles from './styles.module.scss';

import { FiRefreshCcw } from 'react-icons/fi';

import { setupApiClient } from "../../services/api";
import { toast } from "react-toastify";

type OrdersItems = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface OrdersProps {
    orders: OrdersItems[];
}

export default function Dashboard({ orders }: OrdersProps) {
    const [ordersList, setOrdersList] = useState(orders || []);

    function handleOpenModalView(id: string) {
        alert("Mesa: " + id);
    }

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
                    {ordersList.map(item => (
                        <section className={styles.orderItem}
                            key={item.id}> 
                            <button onClick={() => handleOpenModalView(item.id)}>
                                <div className={styles.tag}></div>
                                <span>Mesa: {item.table}</span>
                            </button>
                        </section>  
                    ))}               
                </article>
            </main>
        </>
    )
}

export const getServerSideProps = usuariosLogados(async (ctx) => {
    const apiClient = setupApiClient(ctx);
    const response = await apiClient.get('/api/orders/send');

    return {
        props: {
            orders: response.data
        }
    }
});