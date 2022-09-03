import Head from '../../../node_modules/next/head';
import styles from './styles.module.scss';
import { Header } from '../../components/Header/index';

import { usuariosLogados } from '../../utils/usuariosLogados';

export default function Product() {
  return (
    <>
      <Head>
        <title>Produtos - Sujeito Pizza</title>
      </Head>
      <div>
        <Header/>

        <main className={styles.container}>
          <h1>Novo Produto</h1>

          <form className={styles.form}>

            <select>
              <option>Bebida</option>
              <option>Pizzas</option>
            </select>

            <input type="text" className={styles.input}
                placeholder="Digite o nome do produto" />

            <input type="text" className={styles.input}
                placeholder="Preço do produto" />      

            <textarea className={styles.input}
                placeholder="Descreva seu produto..." /> 

            <button className={styles.buttonAdd} type="submit">
              Cadastrar  
            </button>   
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = usuariosLogados(async (ctx) => {

  return {
    props: {}
  }
});