import { usuariosLogados } from "../../utils/usuariosLogados"

export default function Dashboard() {
    return (
        <div>
            <h1>Página inicial</h1>
        </div>
    )
}

export const getServerSideProps = usuariosLogados(async (context) => {
    return {
        props: {}
    }
});