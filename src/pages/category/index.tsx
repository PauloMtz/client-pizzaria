import { useState, FormEvent } from 'react';
import Head from '../../../node_modules/next/head';
import { Header } from '../../components/Header/index';
import styles from './styles.module.scss';
import { setupApiClient } from '../../services/api';
import { toast } from 'react-toastify';

export default function Category() {
  const [name, setName] = useState('')

  async function handleRegister(event: FormEvent){
    event.preventDefault();

    if (name === '') {
      toast.error("Preencha o campo com o nome da categoria");
      return;
    }

    const apiClient = setupApiClient();
    await apiClient.post('/api/categories', { name: name });
    toast.success('Registro inserido com sucesso!');
    // limpa o campo do formulário
    setName('');
  }

  return(
    <>
    <Head>
      <title>Categorias - Sujeito Pizzaria</title>
    </Head>
    <div>
      <Header/>

      <main className={styles.container}>
        <h1>Categorias</h1>

        <form className={styles.form} onSubmit={handleRegister}>
          <input type="text" placeholder="Digite o nome da categoria"
            className={styles.input} value={name}
            onChange={(e) => setName(e.target.value)} />

          <button className={styles.buttonAdd} type="submit">
            Cadastrar
          </button>
        </form>
      </main>
    </div>
    </>
  )
}