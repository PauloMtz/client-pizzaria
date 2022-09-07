import { useState } from "react";
import Head from "../../../node_modules/next/head";
import { Header } from "../../components/Header/index";
import { usuariosLogados } from "../../utils/usuariosLogados"
import styles from './styles.module.scss';

import { FiRefreshCcw } from "react-icons/fi";

import { setupApiClient } from "../../services/api";
import Modal from "react-modal"; // yarn add react-modal // yarn add @types/react-modal -D
import { ModalOrders } from "../../components/ModalOrders";

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

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
      id: string;
      name: string;
      description: string;
      price: string;
      banner: string;
    }
    order: {
      id: string;
      table: string | number;
      status: boolean;
      name: string | null;
    }
}

export default function Dashboard({ orders }: OrdersProps) {
    const [ordersList, setOrdersList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal(){
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string) {
        //alert("Mesa: " + id);

        const apiClient = setupApiClient(); 

        const response = await apiClient.get('/api/orders/details', {
            params: {
                order_id: id,
            }
        });

        setModalItem(response.data);
        setModalVisible(true);
    }

    async function handleFinishItem(id: string) {
        //alert("Pedido: " + id);
        const apiClient = setupApiClient();
        await apiClient.put('/api/orders/finish', {
        order_id: id,
        })

        // atualiza a lista de pedidos
        const response = await apiClient.get('/api/orders/send');

        setOrdersList(response.data);
        setModalVisible(false);
    }

    async function handleRefreshOrders(){
        const apiClient = setupApiClient();
    
        const response = await apiClient.get('/api/orders/send')
        setOrdersList(response.data);
    }

    // esse '__next' é o id da div da página <></> (ver código fonte da página)
    Modal.setAppElement('#__next');

    return (
        <>
            <Head>
                <title>Painel - Sujeito Pizza</title>
            </Head>

            <Header />

            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button onClick={handleRefreshOrders}>
                        <FiRefreshCcw size={25} color="#3fffa3"/>
                    </button>
                </div>

                {ordersList.length === 0 && (
                    <span className={styles.emptyList}>Não há nenhum pedido em aberto no momento...</span>
                )}

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
            { modalVisible && (
                <ModalOrders isOpen={modalVisible} order={modalItem}
                    onRequestClose={handleCloseModal}
                    handleFinishOrder={ handleFinishItem } />
            )}
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