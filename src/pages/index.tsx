import Head from "../../node_modules/next/head";
import Image from "../../node_modules/next/image";
import logoImg from "../../public/logo.svg";
import styles from "../../styles/home.module.scss";
import { Input } from "../components/ui/Input/index";
import { Button } from "../components/ui/Button/index";
import Link from "../../node_modules/next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>App Pizzaria</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <form>
            <Input placeholder="Digite seu email" type="text" />
            <Input placeholder="Sua senha" type="password" />
            <Button type="submit" loading={false}>Cadastrar</Button>
          </form>

          <Link href="/signup">
            <a className={styles.text}>Nao possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}
