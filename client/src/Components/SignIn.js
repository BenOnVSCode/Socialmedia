import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link } from "react-router-dom"
import { signIn} from '../redux/actions/auth';
export default function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.auth)


  return (
    <Flex

      minH="100vh"
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Text textAlign="center" fontSize={'4xl'}>Sign in to your account</Text>
  
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input onChange={(e) => setEmail(e.target.value)} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input onChange={(e) => setPassword(e.target.value)} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Text to="/forgot" as={Link} color={'blue.400'}>Forgot password?</Text>
                <Text to="/signup" as={Link} color={'blue.400'}>Sign Up</Text>
              </Stack>
              
              {
                loading ? (
                  <Button
                    color={'white'}
                    colorScheme="blue"
                    isDisabled={true}
                    >
                    <Spinner colorScheme="white" />
                  </Button>
                  
                ) : (
                  <Button
                    color={'white'}
                    onClick={() => dispatch(signIn({email, password}))}
                    colorScheme="blue"
                    >
                    Sign in
                  </Button>
                )
              }
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}