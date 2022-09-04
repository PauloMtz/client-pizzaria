import { ChangeEvent, FormEvent, useState } from 'react';
import Head from '../../../node_modules/next/head';

import { FiUpload } from 'react-icons/fi';

import styles from './styles.module.scss';
import { Header } from '../../components/Header/index';
import { usuariosLogados } from '../../utils/usuariosLogados';
import { setupApiClient } from '../../services/api';
import { toast } from 'react-toastify';
import Router from '../../../node_modules/next/router';

// 2. transforma em props
type ItemProps = {
  id: string;
  name: string;
}

// 3. transforma em interface
interface CategoryProps {
  categoriesList: ItemProps[];
}

export default function Product({ categoriesList }: CategoryProps) {
  //console.log(categoriesList);

  // useState para pegar o que for enviado pelo formulário
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);
  const [categories, setCategories] = useState(categoriesList || []);
  const [categorySelected, setCategorySelected] = useState(0);

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

  // quando o usuário seleciona uma categoria na lista
  function handleChangeCategory(event) {
    //console.log("Categoria selecionada: ", categories[event.target.value]);
    //console.log("Posição na lista: ", event.target.value);

    setCategorySelected(event.target.value);
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const dados = new FormData();

      if (name === '' || price === '' || description === '' || imageAvatar === null) {
        toast.error('Preencha os campos corretamente');
        return;
      }

      // pega os dados enviados pelo formulário
      dados.append('name', name);
      dados.append('price', price);
      dados.append('description', description);
      dados.append('category_id', categories[categorySelected].id);
      // 'file' foi o nome dado lá no backend (campos no insomnia)
      dados.append('file', imageAvatar);

      const apiClient = setupApiClient();
      await apiClient.post('/api/products', dados);
      toast.success('Produto cadastrado com sucesso!');
      Router.push('/dashboard');
    } catch (error) {
      toast.error('Error ao cadastrar produto');
      console.log('>>> Erro ao cadastrar produto: ', error);
    }
  }

  return (
    <>
      <Head>
        <title>Produtos - Sujeito Pizza</title>
      </Head>
      <div>
        <Header/>

        <main className={styles.container} onSubmit={handleRegister}>
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

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    { item.name }
                  </option>
                )
              })}
            </select>

            <input type="text" className={styles.input} value={name}
                placeholder="Digite o nome do produto" 
                onChange={(e) => setName(e.target.value)} />

            <input type="text" className={styles.input} value={price}
                placeholder="Preço do produto"
                onChange={(e) => setPrice(e.target.value)} />      

            <textarea className={styles.input} value={description}
                placeholder="Descreva seu produto..."
                onChange={(e) => setDescription(e.target.value)} /> 

            <button className={styles.buttonAdd} type="submit">
              Cadastrar  
            </button>   
          </form>
        </main>
      </div>
    </>
  )
}

// 1. pega a lista no banco
export const getServerSideProps = usuariosLogados(async (ctx) => {
  const apiClient = setupApiClient(ctx);

  // pegar as categorias para preencher o combobox
  const response = await apiClient.get('/api/categories');

  //console.log(response.data);

  return {
    props: {
      categoriesList: response.data
    }
  }
});