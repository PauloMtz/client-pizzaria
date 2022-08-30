import { createContext, ReactNode, useState } from 'react';
import { destroyCookie } from '../../node_modules/nookies/dist/index';
import Router from '../../node_modules/next/router';

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
    console.log("E-mail: ", email);
    console.log("Senha: ", password);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}