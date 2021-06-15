
import { useQuery } from "react-query";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
}
interface UserResponseProps {
  users: User[];
  totalCount: number;
};


const getUsers = async (page: number): Promise<UserResponseProps> => {
  const { data, headers } = await api.get('/users', {
    params: {
      page,
    }
  });
  
  const totalCount = Number(headers['x-total-count'])    
  
  const users = data.users.map((user: User) => {
    return {
      ...user,      
      created_at: new Date(user.created_at).toLocaleString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    totalCount,
    users
  }
}

const useUsers = (page: number) => {
  return useQuery(['users', { page }], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10minutes
  })
};

export { useUsers, getUsers };
