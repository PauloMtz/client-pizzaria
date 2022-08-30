import { createContext, ReactNode, useState } from 'react';

// define o tipo de contexto
type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
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
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}