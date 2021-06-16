import { createContext, ReactNode, useContext } from "react";
import { auth } from "../services/auth";

type SignInCredentials = {
  email: string;
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;  
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn({ email, password }: SignInCredentials) {
    const response = await auth.post('/sessions', {
      email,
      password
    })

    console.log(response.data)
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthProvider,
  AuthContext
}