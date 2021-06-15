import { useRouter } from 'next/router';
import Link from 'next/link';
import { api } from '../../services/api';
import { useMutation } from 'react-query';
import { queryClient } from '../../services/queryClient';
import { 
  Box, 
  Divider, 
  Flex,
  Heading,
  SimpleGrid,
  VStack,
  HStack,
  Button
} from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../components/Form/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;

};

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório').trim(),
  password: yup.string().min(6, 'Sua senha deve possuir no mínimo 6 caracteres').required('A senha é obrigatória'),
  password_confirmation: yup.string().oneOf([ null, yup.ref('password') ], 'As senhas precisam ser iguais')  
})

export default function CreateUser() {
  const router = useRouter()
  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    })

    return response.data.user
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')      
    }
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(CreateUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (user) => {
    await createUser.mutateAsync(user)

    router.push('/users')
  };

  return (
    <Box>      
      <Header />
      <Flex w="100%" my="6" maxW="1480" mx="auto" px="6">
        <Sidebar />
        <Box
          as="form"
          flex="1"
          borderRadius="8"
          bgColor="gray.800"
          p={["6",
          "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo" 
                error={errors?.name}
                {...register('name')}
              />
              <Input
                name="email"
                label="E-mail" 
                error={errors?.email}
                {...register('email')}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha" 
                error={errors?.password}
                {...register('password')}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirme sua senha" 
                error={errors?.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                isLoading={isSubmitting}
                colorScheme="pink">Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </ Flex>
    </Box>
  );
};
