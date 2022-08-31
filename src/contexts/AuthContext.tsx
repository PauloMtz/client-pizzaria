import { createContext, ReactNode, useState } from 'react';
import { destroyCookie, setCookie, parseCookies } from '../../node_modules/nookies/dist/index';
// yarn add axios nookies jwt-decode
import Router from '../../node_modules/next/router';
import { api } from '../services/apiClient';

// define o tipo de contexto
type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

// esse contexto irá seguir o AuthContextData definido acima
export const AuthContext = createContext({} as AuthContextData);

// efetua o logout do usuário
export function signOut() {
  try {
    destroyCookie(undefined, '@app_client_pizzaria.token');
    Router.push('/');
  } catch (error) {
    console.log(error);
  }
}

// o provider serve para qualquer componente ter acesso
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user; // '!!' converte para boolean

  // signIn foi o nome dado num dos tipos do contexto (acima)
  async function signIn({email, password}: SignInProps) {

    try {
      const response = await api.post("/login", {
        email, password
      });

      //console.log(response.data);

      // pega os dados disponibilizados pela requisição (pela api)
      const { id, name, token } = response.data;
      setCookie(undefined, '@app_client_pizzaria.token', token, {
        maxAge: 60 * 60 * 24, // 24 horas
        path: "/" // todo mundo tem acesso ao cookie
      });

      setUser({ id, name, email });

      // passar o token para todas as rotas
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      // redireciona usuário para a página inicial
      Router.push('/dashboard');
    } catch (error) {
      console.log(">>> Erro no login: ", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}