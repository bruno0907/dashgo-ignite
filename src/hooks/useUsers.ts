
import { useQuery } from "react-query";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

interface Users {
  users: User[];
}

const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get<Users>('/users');
  
  const users = data.users.map(user => {
    return {
      ...user,      
      createdAt: new Date(user.createdAt).toLocaleString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return users
}

const useUsers = () => {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 5, // 5 seconds
  })
};

export { useUsers, getUsers };
