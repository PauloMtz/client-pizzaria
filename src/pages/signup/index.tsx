import { FormEvent, useState, useContext } from 'react';
import Head from '../../../node_modules/next/head';
import Image from '../../../node_modules/next/image';
import styles from '../../../styles/home.module.scss';

import logoImg from '../../../public/logo.svg';

import { Input } from '../../components/ui/Input/index';
import { Button } from '../../components/ui/Button/index';

import Link from '../../../node_modules/next/link';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify'; // yarn add react-toastify

export default function SignUp() {
  const { signUp } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === '' || email === '' || password === '') {
      toast.error("Preencha os campos corretamente.");
      return;
    }

    setLoading(true);

    let dados = {
      name, email, password
    }

    await signUp(dados);

    setLoading(false);
  }

  return (
    <>
    <Head>
      <title>Faça seu cadastro agora!</title> 
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

      <div className={styles.login}>
        <h1>Criando sua conta</h1>

        <form onSubmit={handleSignUp}>
          <Input placeholder="Digite seu nome" type="text"
            value={name} onChange={(e) => setName(e.target.value)} />

          <Input placeholder="Digite seu email" type="text"
            value={email} onChange={(e) => setEmail(e.target.value)} />

          <Input placeholder="Sua senha" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          
          <Button type="submit" loading={loading}>
            Cadastrar
          </Button>
        </form>

        <Link href="/">
           <a className={styles.text}>Já possui uma conta? Faça login!</a>
        </Link>

      </div>
    </div>
    </>
  )
}
