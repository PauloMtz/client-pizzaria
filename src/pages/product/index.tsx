import { ChangeEvent, useState } from 'react';
import Head from '../../../node_modules/next/head';

import { FiUpload } from 'react-icons/fi';

import styles from './styles.module.scss';
import { Header } from '../../components/Header/index';
import { usuariosLogados } from '../../utils/usuariosLogados';

export default function Product() {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    // verifica se enviou algum arquivo
    if (!event.target.files) {
      return;
    }

    // se tiver enviado, pega a primeira
    const image = event.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      console.log(event.target.files);
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

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

            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={25} color="#FFF" />
              </span>

              <input type="file" accept='image/png, image/jpeg'
                onChange={handleFile} />

              {avatarUrl && (
                <img src={avatarUrl} alt='Imagem do Produto' 
                  width={100} height={100} className={styles.preview} />
              )}
            </label>

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