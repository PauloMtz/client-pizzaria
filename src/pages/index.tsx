import { FormEvent, useContext, useState } from "react";
import Head from "../../node_modules/next/head";
import Image from "../../node_modules/next/image";
import logoImg from "../../public/logo.svg";
import styles from "../../styles/home.module.scss";
import { Input } from "../components/ui/Input/index";
import { Button } from "../components/ui/Button/index";
import Link from "../../node_modules/next/link";
import { toast } from 'react-toastify'; // yarn add react-toastify

import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event:FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.warning('Preencha os campos corretamente.');
      return;
    }

    setLoading(true);

    let dados = {
      email,
      password,
    }

    await signIn(dados);
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>App Pizzaria</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder="Digite seu email" type="text"
              value={email} onChange={(e) => setEmail(e.target.value)} />

            <Input placeholder="Sua senha" type="password"
              value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button type="submit" loading={loading}>Entrar</Button>
          </form>

          <Link href="/signup">
            <a className={styles.text}>Nao possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}
