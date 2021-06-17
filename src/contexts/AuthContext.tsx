import { createContext, ReactNode, useState } from "react";
import Router from "next/router";
import { auth } from "../services/auth";

type SignInCredentials = {
  email: string;
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;  
  isAuthenticated: boolean;  
  user: User;
}

type AuthProviderProps = {
  children: ReactNode;
}

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {  
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { data } = await auth.post<Omit<User, 'email'>>('/sessions', {
        email,
        password
      })
  
      const { permissions, roles } = data
  
      setUser({
        email,
        permissions,
        roles
      })

      Router.push('/dashboard')
      
    } catch (error) {
      console.log(error.message)

    }
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      isAuthenticated,  
      user    
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthProvider,
  AuthContext
}