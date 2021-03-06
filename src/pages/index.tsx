import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório!').email('E-mail inválido!').trim(),
  password: yup.string().required('Senha obrigatória!').trim()
});

export default function Home() {  
  const { signIn } = useAuth()
  const { 
    register, 
    handleSubmit, 
    formState: { 
      errors, 
      isSubmitting 
    },  
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {  
    try {
      await new Promise(resolve => setTimeout(resolve, 750));    
      await signIn(values)      
      
    } catch (error) {
      console.log(error.message)

    } 

  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW="360"
        bg="gray.800"
        p="8"
        borderRadius="8px"
        flexDir="column"     
        onSubmit={handleSubmit(handleSignIn)}   
      >
        <Stack spacing="4">
          <Input 
            label="E-mail" 
            name="email" 
            type="email" 
            error={errors?.email}
            {...register('email')}
          />        
          <Input 
            label="Senha" 
            name="password" 
            type="password" 
            error={errors?.password}
            {...register('password')}
          />  
        </Stack>
        <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={isSubmitting}>Entrar</Button>
      </Flex>      
    </Flex>
  )
}
