import Head from "../../../node_modules/next/head";
import { Header } from "../../components/Header/index";
import { usuariosLogados } from "../../utils/usuariosLogados"

export default function Dashboard() {
    return (
        <div>
            <Head>
                <title>Painel - Sujeito Pizza</title>
            </Head>
            <div>
                <Header />
                <h1>Painel</h1>
            </div>
        </div>
    )
}

export const getServerSideProps = usuariosLogados(async (context) => {
    return {
        props: {}
    }
});