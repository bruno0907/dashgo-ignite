
import { useQuery } from "react-query";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

interface GetUsersResponseProps {
  users: User[];
  totalCount: number;
}


const getUsers = async (page: number): Promise<GetUsersResponseProps> => {
  const { data, headers } = await api.get('/users', {
    params: {
      page,
    }
  });
  
  const totalCount = Number(headers['x-total-count'])  
  
  const users = data.users.map((user: User) => {
    return {
      ...user,      
      createdAt: new Date(user.createdAt).toLocaleString('pt-BR', {
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
