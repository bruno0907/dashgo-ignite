import { useState } from 'react';
import NextLink from 'next/link';
import { 
  Box, 
  Button, 
  Flex, 
  Heading, 
  Icon, 
  Table, 
  Th, 
  Thead, 
  Tbody, 
  Tr, 
  Checkbox, 
  Td, 
  Text, 
  useBreakpointValue,
  Spinner,
  Link
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';
import { useUsers } from '../../hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

export default function UserList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(page)  

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const { data } = await api.get(`/users/${userId}`);

      return data;
    }, {
      staleTime: 1000 * 60 * 10, // 10 minutes
    })
  }  

  return (
    <Box>      
      <Header />
      <Flex w="100%" my="6" maxW="1480" mx="auto" px="6">
        <Sidebar />        
        <Box flex="1" borderRadius="8" bgColor="gray.800" p={["4", "8"]}>
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button as="a" size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine} />}>Criar novo</Button>
            </NextLink>
          </Flex>          
            { isLoading ? (
              <Flex aling="center" justify="center"> 
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex align="center" justify="center">
                <Text>Falha ao obter dados dos usuários</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px={["3", "6"]} color="gray.300" w="8">
                        <Checkbox colorScheme="pink"></Checkbox>
                      </Th>
                      <Th>Usuário</Th>
                      {isWideVersion && <Th>Data de cadastro</Th>}
                      <Th w={"8"} />
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.users.map(user => {
                      return (
                        <Tr key={user.id}>
                          <Td px={["3", "6"]}>
                            <Checkbox colorScheme="pink"></Checkbox>
                          </Td>
                          <Td>
                            <Box>
                              <NextLink href="#" passHref >
                                <Link
                                  color="purple.400"
                                  onMouseEnter={() => handlePrefetchUser(user.id)}                                
                                >
                                  <Text fontWeight="bold">{user.name}</Text>
                                </Link>
                              </NextLink>
                              <Text fontSize="small" color="gray.300">{user.email}</Text>
                            </Box>
                          </Td>
                          {isWideVersion && <Td>{user.created_at}</Td>}
                          <Td px={["3", "6"]}> 
                            {isWideVersion 
                              ? <Button as="a" size="sm" fontSize="sm" colorScheme="purple" leftIcon={<Icon as={RiPencilLine} />}>Editar</Button>
                              : <Button as="a" size="sm" colorScheme="purple"><Icon as={RiPencilLine} fontSize="20"/></Button>
                            }
                          </Td>                   
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
                <Pagination 
                  totalCountOfRegisters={data.totalCount}                  
                  currentPage={page}
                  onPageChange={setPage}
                />
              </>
            )}
        </Box>
      </ Flex>
    </Box>    
  );
};
