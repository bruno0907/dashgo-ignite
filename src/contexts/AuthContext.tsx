import { createContext, ReactNode, useState, useEffect } from "react";
import Router from "next/router";
import { auth } from "../services/auth";
import { setCookie, parseCookies } from 'nookies'

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
  name: string;
  avatar: string;
  email: string;
  permissions: string[];
  roles: string[];
  token: string;
  refreshToken: string;
};

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {  
  const [user, setUser] = useState<User>(null)
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'dashgo.token': token } = parseCookies()
    
    if(token) {
      auth.get('/me')
      .then(({ data }) => setUser(data))
      .catch(error => console.log(error))    
    }

  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { data } = await auth.post<User>('/sessions', {
        email,
        password
      })      

      const {
        token, 
        refreshToken 
      } = data

      setCookie(undefined, 'dashgo.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
      setCookie(undefined, 'dashgo.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
      auth.defaults.headers['Authorization'] = `Bearer ${token}` // Default header setup on first SignIn
  
      setUser(data)

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